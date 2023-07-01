import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { Slider, IStackTokens, Stack, IStackStyles } from "@fluentui/react";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Toggle } from "@fluentui/react/lib/Toggle";
import {Command, IMessageRequest, IMessageResponse} from '../models';
import './App.css'

const App = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [controlsEnabled, setControlsEnabled] = useState<boolean>(true);
  const [toggleVolumeDisabled, setToggleVolumeDisabled] = useState<boolean>(false);

  const sendMessageToActiveTab = async (message: IMessageRequest): Promise<IMessageResponse> => {
    const tabs: browser.Tabs.Tab[] = await browser.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    if(activeTab){
      return browser.tabs.sendMessage(activeTab.id, message);
    } else {
      console.error("No Active tabs found, tabs:", tabs)
      return Promise.reject(new Error("No Active tabs found, tabs"))
    }
  }

  const init = async () => {
    const [responseVolume, responseEnabled] = await Promise.all([
      sendMessageToActiveTab({ command: Command.GET_VOLUME }),
      sendMessageToActiveTab({ command: Command.GET_ENABLED })
    ])
    setSliderValue(responseVolume.data);
    setControlsEnabled(responseEnabled.data);
    setLoading(false);
  }

  useEffect(() => {
    init()
      .catch((error) => {
        console.debug("Init error: ", error);

        /**
         * In firefox if the user doesn't give the "Access your data for all websites" permission 
         * the content script is executed only when the user click on the extension icon so the receiver is not yet initialized
         */
        setTimeout(() => {
          init()
            .catch((error) => {
              console.debug("Init error seocond time: ", error);
            })
        }, 1000);

      });
  }, []);

  const sliderOnChange = (value: number) => {
    console.debug("sliderOnChange. value: ", value);

    sendMessageToActiveTab({ command: Command.SET_VOLUME, data: value})
      .then(response => {
        setSliderValue(value);
      })
      .catch(e => {
        console.error(e)
      })
  };

  const volumeEnabledOnChange = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    const enabled = checked ?? false;
    setToggleVolumeDisabled(true);

    sendMessageToActiveTab({ command: Command.SET_ENABLED, data: enabled})
      .then(response => {
        setToggleVolumeDisabled(false);
        setControlsEnabled(enabled);
      })
      .catch(e => {
        console.error(e)
        setToggleVolumeDisabled(false);
      })

  };

  return (
    <>
      {loading ? (
        <Spinner size={SpinnerSize.medium} />
      ) : (
        <div className="app-container">
          <Slider
            label="Volume"
            min={0}
            max={600}
            value={sliderValue}
            showValue
            onChange={sliderOnChange}
            ariaValueText={(value: number) => `${value} percent`}
            valueFormat={(value: number) => `${value}%`}
            disabled={!controlsEnabled}
          />
          <Toggle
            label={"Enabled"}
            inlineLabel
            checked={controlsEnabled}
            onText="On"
            offText="Off"
            onChange={volumeEnabledOnChange}
            disabled={toggleVolumeDisabled}
          />
        </div>
      )}
    </>
  );
};

export default App;
