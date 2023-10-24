import { setCookie, getCookie } from "cookies-next";

type WatchList = any[];

export function getWatchList(): WatchList {
  const watchList = getCookie("watchList");
  if (watchList) {
    return JSON.parse(watchList);
  } else {
    return [];
  }
}

export function setWatchList(watchList: WatchList): void {
  setCookie("watchList", JSON.stringify(watchList));
}

export function addToWatchList(item: any): void {
  const watchList = getWatchList();
  watchList.push(item);
  setWatchList(watchList);
}

export function removeFromWatchList(item: any): void {
  const watchList = getWatchList();
  const index = watchList.indexOf(item);
  if (index > -1) {
    watchList.splice(index, 1);
    setWatchList(watchList);
  }
}
