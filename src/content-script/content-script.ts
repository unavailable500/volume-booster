const _ = require("arrive"); //can't use import
import browser from "webextension-polyfill";
import {IMessageRequest, IStorage, IMessageResponse, Command} from '../models';

const VOLUME_DEFAULT_VALUE = 100;

var storage: IStorage = {
  initialized: false,
  volume: VOLUME_DEFAULT_VALUE,
  enabled: true,
};

function connectOutput(element: HTMLMediaElement) {
  console.debug("connectOutput connecting element: ", element);
  storage.audioCtx.createMediaElementSource(element).connect(storage.gainNode);
  storage.gainNode.connect(storage.audioCtx.destination);
}

function initAudioContext(document: Document) {
  // init only the first time when audioCtx is undefined
  if (!storage.audioCtx) { 
    console.debug("Initializing audioContext")
    storage.audioCtx = new AudioContext();
    storage.gainNode = storage.audioCtx.createGain();
    //storage.gainNode.channelInterpretation = "speakers";

    document.querySelectorAll("audio, video").forEach(connectOutput);
    document.arrive("audio, video", connectOutput);

    document.addEventListener("click", () => {
      if (storage.audioCtx.state === "suspended") {
        storage.audioCtx.resume();
      }
    });
  }
}

function setVolumeInGainNode(volume: number) {
  storage.gainNode.gain.value = (volume/100);
}

function initDocument(document: Document) {
  if (storage.initialized) {
    console.debug("Already initialized");
    return;
  }

  browser.runtime.onMessage.addListener((message: IMessageRequest): void | Promise<IMessageResponse> => {
    initAudioContext(document);
    switch (message.command) {
      case Command.GET_VOLUME:
        return Promise.resolve({ data: storage.volume });
      case Command.SET_VOLUME:
        const volume = message.data;
        storage.volume = volume;
        if(storage.enabled){
          setVolumeInGainNode(volume);
        }
        break;
      case Command.GET_ENABLED:
        return Promise.resolve({ data: storage.enabled });
      case Command.SET_ENABLED:
        const enabled = message.data;
        storage.enabled = enabled;
        if(enabled){
          setVolumeInGainNode(storage.volume);
        } else {
          setVolumeInGainNode(VOLUME_DEFAULT_VALUE);
        }
        break;

    }
  });
  storage.initialized = true;
}

function initWhenReady(document: Document) {
  console.debug("Begin initWhenReady");
  window.onload = () => {
    initDocument(window.document);
  };
  if (document) {
    if (document.readyState === "complete") {
      initDocument(document);
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === "complete") {
          initDocument(document);
        }
      };
    }
  }
  console.debug("End initWhenReady");
}

try {
  initWhenReady(document);
} catch (e) {
  console.error("Something gone wrong", e);
}
