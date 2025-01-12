import { Event, ipcRenderer } from 'electron'
import {
  NODE_RESTART_SUCCESS,
  UPDATED,
  DOWNLOAD_PROGRESS,
  UPDATE_VERSION,
  SET_NODE_NET,
  UPDATE_NODE,
  OPEN_TMP,
  OPEN_DIPPERIN,
  START_NODE,
  STOP_NODE,
  START_SUCCESS
} from '@/utils/constants'
import { getIsRemoteNode } from '@/utils/node'

export const onNodeRestart = (updateCallback: () => void, finallCallback: () => void) => {
  ipcRenderer.on(NODE_RESTART_SUCCESS, (_: Event, eventType: string) => {
    if (eventType === UPDATED) {
      // update success
      updateCallback()
    }
    finallCallback()
  })
}

export const onDownloadProgress = (cb: (progress: number) => void) => {
  ipcRenderer.on(DOWNLOAD_PROGRESS, (_: Event, progress: number) => {
    cb(progress)
  })
}

export const onUpdateVersion = (cb: (status: string) => void) => {
  ipcRenderer.on(UPDATE_VERSION, (_: Event, status: string) => {
    cb(status)
  })
}

export const onStartNodeSuccess = (cb: () => void) => {
  ipcRenderer.on(START_SUCCESS, () => {
    cb()
  })
}

export const sendStartNode = () => {
  ipcRenderer.send(START_NODE)
}

export const sendStopNode = () => {
  ipcRenderer.send(STOP_NODE)
}

export const sendUpdateVersion = () => {
  const isRemoteNode = getIsRemoteNode()
  if (!isRemoteNode) {
    // update local node version and start
    ipcRenderer.send(UPDATE_VERSION)
  }
}

export const setNodeNet = (net: string) => {
  ipcRenderer.send(SET_NODE_NET, net)
}

export const updateNode = () => {
  ipcRenderer.send(UPDATE_NODE)
}

export const openTmp = () => {
  ipcRenderer.send(OPEN_TMP)
}

export const openDipperin = () => {
  ipcRenderer.send(OPEN_DIPPERIN)
}
