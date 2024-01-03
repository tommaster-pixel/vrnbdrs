(function(){
    var script = {
 "borderRadius": 0,
 "start": "this.playAudioList([this.audio_8336F2A9_96D6_B2B6_41D4_F503C7B52FBC]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_83449444_965F_55FD_41E1_5D5E4F732E09], 'cardboardAvailable'); this.playList_8EB8F890_96CA_BE96_41D9_CD989AB43A7D.set('selectedIndex', 0)",
 "gap": 10,
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "propagateClick": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "width": "100%",
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.IconButton_83449444_965F_55FD_41E1_5D5E4F732E09"
 ],
 "horizontalAlign": "left",
 "shadow": false,
 "desktopMipmappingEnabled": false,
 "vrPolyfillScale": 1,
 "contentOpaque": false,
 "layout": "absolute",
 "defaultVRPointer": "laser",
 "scripts": {
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getKey": function(key){  return window[key]; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "existsKey": function(key){  return key in window; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "registerKey": function(key, value){  window[key] = value; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); }
 },
 "downloadEnabled": false,
 "scrollBarMargin": 2,
 "paddingRight": 0,
 "paddingBottom": 0,
 "height": "100%",
 "verticalAlign": "top",
 "minHeight": 20,
 "borderSize": 0,
 "mouseWheelEnabled": true,
 "overflow": "visible",
 "minWidth": 20,
 "definitions": [{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8EF9B8F4_96CA_BE9D_41E2_3BD64F5E27C3",
 "initialPosition": {
  "yaw": 144.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_camera",
 "initialPosition": {
  "yaw": 172.42,
  "class": "PanoramaCameraPosition",
  "pitch": -12.63
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "10",
 "id": "panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_84F014B3_9611_3F8E_41B8_4A76CD397F51",
  "this.overlay_8EAFC6F4_96D6_F29D_41DE_DF9D90437103",
  "this.overlay_81D67E6F_96D6_D58A_41D0_FFC9594AB71A"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA",
   "yaw": 14.48,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -168.49
  },
  {
   "panorama": "this.panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232",
   "yaw": 111.33,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -80.7
  },
  {
   "panorama": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
   "yaw": -101.27,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 173.55
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 6290.31,
   "angle": 62.63,
   "y": 2806.71,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E4B996C_96CA_BF8D_41D3_86B65C31042C",
 "initialPosition": {
  "yaw": -9.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_camera",
 "initialPosition": {
  "yaw": 91.15,
  "class": "PanoramaCameraPosition",
  "pitch": -6.59
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E7BF979_96CA_BF97_41D4_9B6A43DF317E",
 "initialPosition": {
  "yaw": 102.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E10690E_96CA_BF8D_41D4_D18D7551985C",
 "initialPosition": {
  "yaw": 93.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "3",
 "id": "panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_99C8F983_9613_E98E_41D0_6ED76FDFC4A3",
  "this.overlay_8613F6BA_9611_7BFE_41D2_96DFF356C7CB"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
   "yaw": 172.83,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -98.06
  },
  {
   "panorama": "this.panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2",
   "yaw": -56.4,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 119.17
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 5077.92,
   "angle": -100.19,
   "y": 2318.43,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_camera",
 "initialPosition": {
  "yaw": 97.46,
  "class": "PanoramaCameraPosition",
  "pitch": -4.94
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8F988995_96CA_BE9E_41D4_B8F2D8956467",
 "initialPosition": {
  "yaw": 81.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E27A945_96CA_BFFF_41BC_1126683FF198",
 "initialPosition": {
  "yaw": -86.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "1",
 "id": "panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_992E9B2E_960F_2A96_41D2_99D17652BE7C",
  "this.overlay_9B1A9C05_963B_D57E_41AC_91FFAF7D83ED",
  "this.overlay_9B17BD3B_963B_F78A_41E1_63FB03AF91B0",
  "this.overlay_9B0C0799_963B_D297_41C3_B1A31FD1EFCB",
  "this.overlay_9B037E4E_963B_D58D_41C0_0ABEF49F8ACE",
  "this.overlay_80F124AB_96DA_D68B_41D5_AF12AC21BE18"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2",
   "yaw": 163.7,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -15.77
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 3567.7,
   "angle": -76.11,
   "y": 3537.89,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E5B195F_96CA_BF8B_41CE_5BA2EF1C262F",
 "initialPosition": {
  "yaw": -68.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "buttonCardboardView": "this.IconButton_83449444_965F_55FD_41E1_5D5E4F732E09",
 "touchControlMode": "drag_rotation",
 "viewerArea": "this.MainViewer",
 "mouseControlMode": "drag_acceleration",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8F8E59A2_96CA_BEBA_41E1_4F62FE1D46E5",
 "initialPosition": {
  "yaw": -60.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8EC2F8DA_96CA_BE95_41C4_3A4AF905B483",
 "initialPosition": {
  "yaw": -6.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "12",
 "id": "panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_82168360_9677_3A8A_41E1_8FCFE7E6A36C",
  "this.overlay_820D823B_9671_3AFE_41D0_A60055D1E151",
  "this.overlay_824B42A9_9671_3B9A_4195_F0DAC4869895"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C",
   "yaw": -80.7,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 111.33
  },
  {
   "panorama": "this.panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA",
   "yaw": -35.33,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 170.43
  },
  {
   "panorama": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 6286.58,
   "angle": 93.97,
   "y": 3351.02,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "label": "7",
 "id": "panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_87F4D2EF_9612_DB96_41D2_D8DB49ADA0E0",
  "this.overlay_84B611D8_9617_59BB_41B1_E6DE2BED51C5",
  "this.overlay_811D1DB5_96DB_B69F_41D0_9975EB60B630"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0",
   "yaw": -78.3,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 101.19
  },
  {
   "panorama": "this.panorama_9FBE2007_95F3_5696_41C0_645E5A02C569",
   "yaw": 93.02,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -109.39
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 2550.13,
   "angle": 175.63,
   "y": 2117.33,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "label": "11",
 "id": "panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_85852C7B_9672_EF7E_41D6_44973B407BF3",
  "this.overlay_85C29AAD_9671_EB9A_41E0_27498D24BD83"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C",
   "yaw": -168.49,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 14.48
  },
  {
   "panorama": "this.panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232",
   "yaw": 170.43,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -35.33
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 7385.12,
   "angle": 75.26,
   "y": 2646.26,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8ED7A8BB_96CA_BE8B_41D4_8ABD40A4655E",
 "initialPosition": {
  "yaw": 11.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_8336F2A9_96D6_B2B6_41D4_F503C7B52FBC.mp3",
  "oggUrl": "media/audio_8336F2A9_96D6_B2B6_41D4_F503C7B52FBC.ogg",
  "class": "AudioResource"
 },
 "id": "audio_8336F2A9_96D6_B2B6_41D4_F503C7B52FBC",
 "data": {
  "label": "Nature Beauty - No Copyright Sound ! Relaxing Flute Music"
 },
 "class": "MediaAudio"
},
{
 "label": "4",
 "id": "panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_862E4BBB_9616_E9FD_41E1_874F38FC7045",
  "this.overlay_867D72BF_9611_5BF6_41C5_B3DB67EBE5BE",
  "this.overlay_868ADE24_9613_6A8A_41C5_C9990C5240AB"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C",
   "yaw": 173.55,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -101.27
  },
  {
   "panorama": "this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0",
   "yaw": -77.53,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -86.65
  },
  {
   "panorama": "this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE",
   "yaw": -98.06,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 172.83
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 6367.28,
   "angle": -9.06,
   "y": 2055.77,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_camera",
 "initialPosition": {
  "yaw": 79.34,
  "class": "PanoramaCameraPosition",
  "pitch": -6.04
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E05E91C_96CA_BF8D_41C4_7FCC87F98825",
 "initialPosition": {
  "yaw": -7.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E0F2929_96CA_BFB7_41C5_6336BD7C8A36",
 "initialPosition": {
  "yaw": -78.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E680987_96CA_BF7B_41E0_A7F6CF2DBDC9",
 "initialPosition": {
  "yaw": 101.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8EB8F890_96CA_BE96_41D9_CD989AB43A7D",
 "class": "PlayList"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8EECD901_96CA_BF77_41A8_5E97584F3159",
 "initialPosition": {
  "yaw": 78.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "2",
 "id": "panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_99B6C444_9611_5E8B_41C6_E68F2E855611",
  "this.overlay_801840D1_96D9_4E97_41C1_B8FB4C9798A5"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150",
   "yaw": -15.77,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 163.7
  },
  {
   "panorama": "this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE",
   "yaw": 119.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -56.4
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 4781.7,
   "angle": -76.25,
   "y": 3157.75,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "fieldOfViewOverlayInsideColor": "#FF0000",
 "label": "WATER MARKED BELONG TO NATHALLI-2",
 "overlays": [
  "this.overlay_846D4FD2_967B_D29A_41DB_EBB594135D79",
  "this.overlay_879E537E_967A_F38D_41B5_6C9FAE759190",
  "this.overlay_85295A39_9679_FD97_41B3_7D1B7B0E93A6",
  "this.overlay_84579F55_9676_B399_41C0_AB05AB76270B",
  "this.overlay_84A37DD2_9677_5695_41D7_8A7BE9F7C6E7",
  "this.overlay_82AC4642_9649_75FA_41C0_5FDF332FE918",
  "this.overlay_8558D8E7_9649_5EBB_41DB_46027101D319",
  "this.overlay_85F435B7_964B_B69B_41B8_6A2EABE71826",
  "this.overlay_85AD8A81_9649_BD77_41B1_5CCFADA9AA81",
  "this.overlay_85ECCCEE_964E_F68D_41C1_392051C4FDC1"
 ],
 "minimumZoomFactor": 1,
 "class": "Map",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "id": "map_98C3900E_9637_4D8D_41CC_2953135E536A",
 "fieldOfViewOverlayRadiusScale": 0.09,
 "width": 9600,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A.jpeg",
    "width": 3000,
    "class": "ImageResourceLevel",
    "height": 1687
   },
   {
    "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_lq.jpeg",
    "width": 341,
    "class": "ImageResourceLevel",
    "height": 192,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayInsideOpacity": 0.36,
 "thumbnailUrl": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_t.jpg",
 "scaleMode": "fit_inside",
 "maximumZoomFactor": 1,
 "initialZoomFactor": 1,
 "height": 5397
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E3C9937_96CA_BF9B_41DC_D6FA55282977",
 "initialPosition": {
  "yaw": 70.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  "this.PanoramaPlayListItem_8EB9F891_96CA_BE96_41D3_DD0CC9C2FC3B",
  "this.PanoramaPlayListItem_8EB94891_96CA_BE96_41D7_9C2089905816",
  "this.PanoramaPlayListItem_8EBAB892_96CA_BE9A_41DF_20DFCFC70276",
  "this.PanoramaPlayListItem_8EBA1893_96CA_BE9A_41B2_760410C073BB",
  "this.PanoramaPlayListItem_8EBB8893_96CA_BE9A_41BD_34C77EAB58B7",
  "this.PanoramaPlayListItem_8EBB0894_96CA_BE9E_41A2_4FAB88A7C684",
  "this.PanoramaPlayListItem_8EA46894_96CA_BE9E_41D7_6A0CE1208F44",
  "this.PanoramaPlayListItem_8EA5B895_96CA_BE9E_41E0_500BEF6BFB1C",
  "this.PanoramaPlayListItem_8EA53895_96CA_BE9E_41D1_142931D17846",
  "this.PanoramaPlayListItem_8EA6A896_96CA_BE9A_41D6_FA784E4539B8"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer",
 "movementMode": "constrained"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_camera",
 "initialPosition": {
  "yaw": 88.95,
  "class": "PanoramaCameraPosition",
  "pitch": -7.96
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_camera",
 "initialPosition": {
  "yaw": 172.42,
  "class": "PanoramaCameraPosition",
  "pitch": -3.57
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_camera",
 "initialPosition": {
  "yaw": 93.35,
  "class": "PanoramaCameraPosition",
  "pitch": -10.98
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "9",
 "id": "panorama_9FBE2007_95F3_5696_41C0_645E5A02C569",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_84FAB97D_9611_6975_41E0_88329BE2D258",
  "this.overlay_851AF530_9613_DE8B_41B8_C3E7511DFA02",
  "this.overlay_81581D39_96DB_D797_41BE_6A97F8E4D7CB"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3",
   "yaw": -109.39,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 93.02
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 1656.84,
   "angle": -185.11,
   "y": 1983.47,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8FACA9BD_96CA_BE8F_41CC_DDF149238125",
 "initialPosition": {
  "yaw": 123.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "label": "6",
 "id": "panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0",
 "class": "Panorama",
 "hfovMin": "120%",
 "hfovMax": 130,
 "pitch": 0,
 "hfov": 360,
 "overlays": [
  "this.overlay_87FDFA91_9611_6B8A_41D8_1E4B41E4E227",
  "this.overlay_801AEFF9_96D9_5297_41CF_542979E6E841"
 ],
 "partial": false,
 "thumbnailUrl": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_t.jpg",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
   "yaw": -86.65,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -77.53
  },
  {
   "panorama": "this.panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3",
   "yaw": 101.19,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -78.3
  }
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/f/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/f/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/f/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/f/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/u/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/u/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/u/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/u/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/r/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/r/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/r/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/r/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/b/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/b/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/b/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/b/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/d/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/d/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/d/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/d/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/l/0/{row}_{column}.jpg",
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "rowCount": 6
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/l/1/{row}_{column}.jpg",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "rowCount": 3
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/l/2/{row}_{column}.jpg",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "rowCount": 2
     },
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0/l/3/{row}_{column}.jpg",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "rowCount": 1
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_t.jpg"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "x": 3473.75,
   "angle": -184.45,
   "y": 2179.83,
   "class": "PanoramaMapLocation"
  }
 ],
 "vfov": 180
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_camera",
 "initialPosition": {
  "yaw": -0.27,
  "class": "PanoramaCameraPosition",
  "pitch": -1.92
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8FBEF9B0_96CA_BE95_41D3_4E1F193E0DCF",
 "initialPosition": {
  "yaw": -16.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8EDFE8CD_96CA_BE8F_41D4_56A954D9C401",
 "initialPosition": {
  "yaw": 99.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_98C3900E_9637_4D8D_41CC_2953135E536A",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_8EBF2890_96CA_BE96_4190_42D6E85EA3DC",
 "class": "PlayList"
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_camera",
 "initialPosition": {
  "yaw": 98.84,
  "class": "PanoramaCameraPosition",
  "pitch": -6.86
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8EF428E7_96CA_BEBB_41A8_1B9BE05A8E28",
 "initialPosition": {
  "yaw": -165.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_8E56F952_96CA_BF95_41D6_A9E62924AD9C",
 "initialPosition": {
  "yaw": 164.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_camera",
 "initialPosition": {
  "yaw": 98.29,
  "class": "PanoramaCameraPosition",
  "pitch": -18.12
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10
},
{
 "playbackBarHeadBorderSize": 0,
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "id": "MainViewer",
 "propagateClick": false,
 "progressRight": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "toolTipFontStyle": "normal",
 "width": "100%",
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontColor": "#606060",
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBorderSize": 0,
 "paddingBottom": 0,
 "height": "100%",
 "displayTooltipInTouchScreens": true,
 "minHeight": 50,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderRadius": 0,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "toolTipPaddingTop": 4,
 "minWidth": 100,
 "playbackBarLeft": 0,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "playbackBarBottom": 5,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "class": "ViewerArea",
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipShadowSpread": 0,
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "transitionDuration": 500,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "shadow": false,
 "toolTipOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "transitionMode": "blending",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "toolTipShadowVerticalLength": 0
},
{
 "playbackBarHeadBorderSize": 0,
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "id": "MapViewer",
 "propagateClick": false,
 "progressRight": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "progressOpacity": 1,
 "right": "0.78%",
 "toolTipFontStyle": "normal",
 "width": "20.816%",
 "progressBarBackgroundColorDirection": "vertical",
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontColor": "#606060",
 "playbackBarOpacity": 1,
 "progressBackgroundOpacity": 1,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBorderSize": 0,
 "paddingBottom": 0,
 "height": "24.32%",
 "displayTooltipInTouchScreens": true,
 "minHeight": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderRadius": 0,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 15,
 "toolTipPaddingTop": 4,
 "minWidth": 1,
 "playbackBarLeft": 0,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "playbackBarBottom": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "class": "ViewerArea",
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipShadowSpread": 0,
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "transitionDuration": 500,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "shadow": false,
 "toolTipOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeadWidth": 6,
 "top": "6.15%",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "data": {
  "name": "MapViewer"
 },
 "progressLeft": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "transitionMode": "blending",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "toolTipShadowVerticalLength": 0
},
{
 "borderRadius": 0,
 "cursor": "hand",
 "id": "IconButton_83449444_965F_55FD_41E1_5D5E4F732E09",
 "class": "IconButton",
 "width": 56,
 "propagateClick": false,
 "horizontalAlign": "center",
 "right": "2.92%",
 "paddingTop": 0,
 "shadow": false,
 "maxWidth": 56,
 "maxHeight": 56,
 "iconURL": "skin/IconButton_83449444_965F_55FD_41E1_5D5E4F732E09.png",
 "transparencyActive": false,
 "bottom": "5.61%",
 "height": 56,
 "mode": "push",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "paddingBottom": 0,
 "minHeight": 1,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "paddingLeft": 0,
 "data": {
  "name": "IconButton14318"
 }
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -101.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.71,
   "hfov": 10.23
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 01"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -6.71,
   "hfov": 10.23,
   "yaw": -101.27,
   "image": "this.AnimatedImageResource_998DA82B_963F_FD8A_41D2_60C7E5141AEB",
   "distance": 100
  }
 ],
 "id": "overlay_84F014B3_9611_3F8E_41B8_4A76CD397F51",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39, this.camera_8EC2F8DA_96CA_BE95_41C4_3A4AF905B483); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 14.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -45.01,
   "hfov": 15.8
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -45.01,
   "hfov": 15.8,
   "yaw": 14.48,
   "image": "this.AnimatedImageResource_8EBCB88A_96CA_BE8A_41E1_03B4B2E01033",
   "distance": 100
  }
 ],
 "id": "overlay_8EAFC6F4_96D6_F29D_41DE_DF9D90437103",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA, this.camera_8ED7A8BB_96CA_BE8B_41D4_8ABD40A4655E); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0_HS_4_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 111.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -49.26,
   "hfov": 11.89
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -49.26,
   "hfov": 11.89,
   "yaw": 111.33,
   "image": "this.AnimatedImageResource_8ED61B05_96D6_B37F_41CC_8FB139270BDC",
   "distance": 100
  }
 ],
 "id": "overlay_81D67E6F_96D6_D58A_41D0_FFC9594AB71A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232, this.camera_8EDFE8CD_96CA_BE8F_41D4_56A954D9C401); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -56.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.6,
   "hfov": 14.07
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -28.6,
   "hfov": 14.07,
   "yaw": -56.4,
   "image": "this.AnimatedImageResource_99898823_963F_FDBA_41AA_01B667C8DDF7",
   "distance": 100
  }
 ],
 "id": "overlay_99C8F983_9613_E98E_41D0_6ED76FDFC4A3",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2, this.camera_8F8E59A2_96CA_BEBA_41E1_4F62FE1D46E5); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 172.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -39.69,
   "hfov": 8.93
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -39.69,
   "hfov": 8.93,
   "yaw": 172.83,
   "image": "this.AnimatedImageResource_99884823_963F_FDBA_41CF_9DB078AB2552",
   "distance": 100
  }
 ],
 "id": "overlay_8613F6BA_9611_7BFE_41D2_96DFF356C7CB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39, this.camera_8F988995_96CA_BE9E_41D4_B8F2D8956467); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 146.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.02,
   "hfov": 9.54
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 02a"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -22.02,
   "hfov": 9.54,
   "yaw": 146.57,
   "image": "this.AnimatedImageResource_998A2822_963F_FDBA_41BC_D8987D95FD56",
   "distance": 100
  }
 ],
 "id": "overlay_992E9B2E_960F_2A96_41D2_99D17652BE7C",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "bleaching": 0.7,
 "pitch": 61.17,
 "id": "overlay_9B1A9C05_963B_D57E_41AC_91FFAF7D83ED",
 "yaw": 11.36,
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "bleaching": 0.7,
 "pitch": 47.17,
 "id": "overlay_9B17BD3B_963B_F78A_41E1_63FB03AF91B0",
 "yaw": 63.8,
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "bleaching": 0.7,
 "pitch": 38.39,
 "id": "overlay_9B0C0799_963B_D297_41C3_B1A31FD1EFCB",
 "yaw": 153.57,
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "bleaching": 0.7,
 "pitch": 43.6,
 "id": "overlay_9B037E4E_963B_D58D_41C0_0ABEF49F8ACE",
 "yaw": -170.67,
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 163.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -44.94,
   "hfov": 10.93
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "for 2"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -44.94,
   "hfov": 10.93,
   "yaw": 163.7,
   "image": "this.AnimatedImageResource_801B50C1_96DA_CEF6_41C3_BB64AB3971AE",
   "distance": 100
  }
 ],
 "id": "overlay_80F124AB_96DA_D68B_41D5_AF12AC21BE18",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2, this.camera_8E56F952_96CA_BF95_41D6_A9E62924AD9C); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -80.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -45.49,
   "hfov": 14.7
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -45.49,
   "hfov": 14.7,
   "yaw": -80.7,
   "image": "this.AnimatedImageResource_998DB82D_963F_FD8E_41DA_5B3EBAD7A609",
   "distance": 100
  }
 ],
 "id": "overlay_82168360_9677_3A8A_41E1_8FCFE7E6A36C",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C, this.camera_8E5B195F_96CA_BF8B_41CE_5BA2EF1C262F); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -35.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -33.2,
   "hfov": 11.11
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.2,
   "hfov": 11.11,
   "yaw": -35.33,
   "image": "this.AnimatedImageResource_998C282D_963F_FD8E_41D7_0CC1E6F0245A",
   "distance": 100
  }
 ],
 "id": "overlay_820D823B_9671_3AFE_41D0_A60055D1E151",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA, this.camera_8E4B996C_96CA_BF8D_41D3_86B65C31042C); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -82.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.38,
   "hfov": 10.27
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.38,
   "hfov": 10.27,
   "yaw": -82.12,
   "image": "this.AnimatedImageResource_998CE82D_963F_FD8E_41E2_22E7D294913E",
   "distance": 100
  }
 ],
 "id": "overlay_824B42A9_9671_3B9A_4195_F0DAC4869895",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -78.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -49.54,
   "hfov": 15.03
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -49.54,
   "hfov": 15.03,
   "yaw": -78.3,
   "image": "this.AnimatedImageResource_998E582A_963F_FD8A_41AA_4F6B1178680E",
   "distance": 100
  }
 ],
 "id": "overlay_87F4D2EF_9612_DB96_41D2_D8DB49ADA0E0",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0, this.camera_8E0F2929_96CA_BFB7_41C5_6336BD7C8A36); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -85.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.13,
   "hfov": 10.25
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.13,
   "hfov": 10.25,
   "yaw": -85.08,
   "image": "this.AnimatedImageResource_998EF82B_963F_FD8A_41D9_254D66292F36",
   "distance": 100
  }
 ],
 "id": "overlay_84B611D8_9617_59BB_41B1_E6DE2BED51C5",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 93.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -48.71,
   "hfov": 11.3
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -48.71,
   "hfov": 11.3,
   "yaw": 93.02,
   "image": "this.AnimatedImageResource_8F9C67B1_96DB_7297_41DA_563838F45D3C",
   "distance": 100
  }
 ],
 "id": "overlay_811D1DB5_96DB_B69F_41D0_9975EB60B630",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FBE2007_95F3_5696_41C0_645E5A02C569, this.camera_8E3C9937_96CA_BF9B_41DC_D6FA55282977); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -168.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -39.14,
   "hfov": 10.94
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -39.14,
   "hfov": 10.94,
   "yaw": -168.49,
   "image": "this.AnimatedImageResource_998D082C_963F_FD8E_41C7_C1000173E789",
   "distance": 100
  }
 ],
 "id": "overlay_85852C7B_9672_EF7E_41D6_44973B407BF3",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C, this.camera_8EF428E7_96CA_BEBB_41A8_1B9BE05A8E28); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 170.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -37.21,
   "hfov": 11.21
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -37.21,
   "hfov": 11.21,
   "yaw": 170.43,
   "image": "this.AnimatedImageResource_998DE82D_963F_FD8E_41D5_F110CB470884",
   "distance": 100
  }
 ],
 "id": "overlay_85C29AAD_9671_EB9A_41E0_27498D24BD83",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232, this.camera_8EF9B8F4_96CA_BE9D_41E2_3BD64F5E27C3); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -98.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -46.45,
   "hfov": 12.56
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -46.45,
   "hfov": 12.56,
   "yaw": -98.06,
   "image": "this.AnimatedImageResource_9988D824_963F_FDBE_41DE_D4FDFC78400A",
   "distance": 100
  }
 ],
 "id": "overlay_862E4BBB_9616_E9FD_41E1_874F38FC7045",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE, this.camera_8E05E91C_96CA_BF8D_41C4_7FCC87F98825); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -77.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.99,
   "hfov": 10.26
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.99,
   "hfov": 10.26,
   "yaw": -77.53,
   "image": "this.AnimatedImageResource_99889824_963F_FDBE_41E1_B6FBE21D772A",
   "distance": 100
  }
 ],
 "id": "overlay_867D72BF_9611_5BF6_41C5_B3DB67EBE5BE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0, this.camera_8E10690E_96CA_BF8D_41D4_D18D7551985C); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 173.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.95,
   "hfov": 10.24
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.95,
   "hfov": 10.24,
   "yaw": 173.55,
   "image": "this.AnimatedImageResource_998F4824_963F_FDBE_41DB_BDC16F788892",
   "distance": 100
  }
 ],
 "id": "overlay_868ADE24_9613_6A8A_41C5_C9990C5240AB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C, this.camera_8EECD901_96CA_BF77_41A8_5E97584F3159); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 119.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.77,
   "hfov": 14.63
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -32.77,
   "hfov": 14.63,
   "yaw": 119.17,
   "image": "this.AnimatedImageResource_99892823_963F_FDBA_41A0_D29B62AA8D8C",
   "distance": 100
  }
 ],
 "id": "overlay_99B6C444_9611_5E8B_41C6_E68F2E855611",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE, this.camera_8FACA9BD_96CA_BE8F_41CC_DDF149238125); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -15.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -40.96,
   "hfov": 14.18
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "for 1"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -40.96,
   "hfov": 14.18,
   "yaw": -15.77,
   "image": "this.AnimatedImageResource_8001BB7B_96D9_B38A_41AD_0F6739D8EE64",
   "distance": 100
  }
 ],
 "id": "overlay_801840D1_96D9_4E97_41C1_B8FB4C9798A5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150, this.camera_8FBEF9B0_96CA_BE95_41D3_4E1F193E0DCF); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "map": {
  "width": 627.17,
  "x": 3254.19,
  "height": 470.31,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_0_map.gif",
     "width": 21,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 3302.89
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 3254.11,
  "height": 470.31,
  "y": 3302.73,
  "class": "HotspotMapOverlayImage",
  "width": 627.17,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_0.png",
     "width": 209,
     "class": "ImageResourceLevel",
     "height": 156
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_846D4FD2_967B_D29A_41DB_EBB594135D79",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 488.66,
  "x": 4537.39,
  "height": 470.31,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 2922.97
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 4537.38,
  "height": 470.31,
  "y": 2922.6,
  "class": "HotspotMapOverlayImage",
  "width": 488.66,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_1.png",
     "width": 162,
     "class": "ImageResourceLevel",
     "height": 156
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_879E537E_967A_F38D_41B5_6C9FAE759190",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457.87,
  "x": 4849.06,
  "height": 424.14,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_2_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 2106.39
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 4848.98,
  "height": 424.14,
  "y": 2106.36,
  "class": "HotspotMapOverlayImage",
  "width": 457.87,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_2.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_85295A39_9679_FD97_41B3_7D1B7B0E93A6",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 6139,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_3_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1843.81
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 6138.78,
  "height": 424,
  "y": 1843.77,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_3.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_84579F55_9676_B399_41C0_AB05AB76270B",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 3245.53,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_4_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1967.88
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 3245.25,
  "height": 424,
  "y": 1967.83,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_4.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_84A37DD2_9677_5695_41D7_8A7BE9F7C6E7",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 2322.08,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_5_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1905.37
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 2321.63,
  "height": 424,
  "y": 1905.33,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_5.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_82AC4642_9649_75FA_41C0_5FDF332FE918",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 1428.46,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_6_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 1771.67
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1428.34,
  "height": 424,
  "y": 1771.47,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_6.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_8558D8E7_9649_5EBB_41DB_46027101D319",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 6062.04,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_7_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 2594.99
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 6061.81,
  "height": 424,
  "y": 2594.71,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_7.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_85F435B7_964B_B69B_41B8_6A2EABE71826",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 7156.71,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_8_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 2434.37
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 7156.62,
  "height": 424,
  "y": 2434.26,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_8.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_85AD8A81_9649_BD77_41B1_5CCFADA9AA81",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 457,
  "x": 6058.2,
  "height": 424,
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_9_map.gif",
     "width": 17,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "y": 3139.38
 },
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 6058.08,
  "height": 424,
  "y": 3139.02,
  "class": "HotspotMapOverlayImage",
  "width": 457,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_98C3900E_9637_4D8D_41CC_2953135E536A_HS_9.png",
     "width": 152,
     "class": "ImageResourceLevel",
     "height": 141
    }
   ]
  }
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_85ECCCEE_964E_F68D_41C1_392051C4FDC1",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay"
},
{
 "media": "this.panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EB9F891_96CA_BE96_41D3_DD0CC9C2FC3B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EB9F891_96CA_BE96_41D3_DD0CC9C2FC3B",
 "camera": "this.panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_camera"
},
{
 "media": "this.panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EB94891_96CA_BE96_41D7_9C2089905816, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EB94891_96CA_BE96_41D7_9C2089905816",
 "camera": "this.panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_camera"
},
{
 "media": "this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EBAB892_96CA_BE9A_41DF_20DFCFC70276, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EBAB892_96CA_BE9A_41DF_20DFCFC70276",
 "camera": "this.panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_camera"
},
{
 "media": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EBA1893_96CA_BE9A_41B2_760410C073BB, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EBA1893_96CA_BE9A_41B2_760410C073BB",
 "camera": "this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_camera"
},
{
 "media": "this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EBB8893_96CA_BE9A_41BD_34C77EAB58B7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EBB8893_96CA_BE9A_41BD_34C77EAB58B7",
 "camera": "this.panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_camera"
},
{
 "media": "this.panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EBB0894_96CA_BE9E_41A2_4FAB88A7C684, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EBB0894_96CA_BE9E_41A2_4FAB88A7C684",
 "camera": "this.panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_camera"
},
{
 "media": "this.panorama_9FBE2007_95F3_5696_41C0_645E5A02C569",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EA46894_96CA_BE9E_41D7_6A0CE1208F44, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EA46894_96CA_BE9E_41D7_6A0CE1208F44",
 "camera": "this.panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_camera"
},
{
 "media": "this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EA5B895_96CA_BE9E_41E0_500BEF6BFB1C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EA5B895_96CA_BE9E_41E0_500BEF6BFB1C",
 "camera": "this.panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_camera"
},
{
 "media": "this.panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EA53895_96CA_BE9E_41D1_142931D17846, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EA53895_96CA_BE9E_41D1_142931D17846",
 "camera": "this.panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_camera"
},
{
 "media": "this.panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232",
 "end": "this.trigger('tourEnded')",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8EA6A896_96CA_BE9A_41D6_FA784E4539B8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8EA6A896_96CA_BE9A_41D6_FA784E4539B8",
 "camera": "this.panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_camera"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -92.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.5,
   "hfov": 14.43
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.5,
   "hfov": 14.43,
   "yaw": -92.51,
   "image": "this.AnimatedImageResource_998D082B_963F_FD8A_41BA_45CF259201E8",
   "distance": 100
  }
 ],
 "id": "overlay_84FAB97D_9611_6975_41E0_88329BE2D258",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -92.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.49,
   "hfov": 10.29
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.49,
   "hfov": 10.29,
   "yaw": -92.56,
   "image": "this.AnimatedImageResource_998DF82B_963F_FD8A_41DC_B75654307846",
   "distance": 100
  }
 ],
 "id": "overlay_851AF530_9613_DE8B_41B8_C3E7511DFA02",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0_HS_3_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -109.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -55.03,
   "hfov": 9.5
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -55.03,
   "hfov": 9.5,
   "yaw": -109.39,
   "image": "this.AnimatedImageResource_8F9F57B1_96DB_7297_41D5_CDBFACEAE5BE",
   "distance": 100
  }
 ],
 "id": "overlay_81581D39_96DB_D797_41BE_6A97F8E4D7CB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3, this.camera_8E27A945_96CA_BFFF_41BC_1126683FF198); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -86.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.22,
   "hfov": 10.29
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.22,
   "hfov": 10.29,
   "yaw": -86.65,
   "image": "this.AnimatedImageResource_998F2824_963F_FDBE_41C1_B032A62C420F",
   "distance": 100
  }
 ],
 "id": "overlay_87FDFA91_9611_6B8A_41D8_1E4B41E4E227",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39, this.camera_8E7BF979_96CA_BF97_41D4_9B6A43DF317E); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0_HS_2_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 101.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -49.81,
   "hfov": 14.95
  }
 ],
 "enabledInCardboard": true,
 "data": {
  "label": "Circle 01b"
 },
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -49.81,
   "hfov": 14.95,
   "yaw": 101.19,
   "image": "this.AnimatedImageResource_8E5B2450_96D9_D596_41C4_91CEC75E26E8",
   "distance": 100
  }
 ],
 "id": "overlay_801AEFF9_96D9_5297_41CF_542979E6E841",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3, this.camera_8E680987_96CA_BF7B_41E0_A7F6CF2DBDC9); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998DA82B_963F_FD8A_41D2_60C7E5141AEB",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8EBCB88A_96CA_BE8A_41E1_03B4B2E01033",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB87B6E_95F3_2A97_41D7_735CC4393D3C_0_HS_4_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8ED61B05_96D6_B37F_41CC_8FB139270BDC",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_99898823_963F_FDBA_41AA_01B667C8DDF7",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FAE1AD3_95F2_EB8E_41DE_5EABB50B4EFE_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_99884823_963F_FDBA_41CF_9DB078AB2552",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998A2822_963F_FDBA_41BC_D8987D95FD56",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9EAB81A0_95F2_D98B_41A6_E808A270F150_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_801B50C1_96DA_CEF6_41C3_BB64AB3971AE",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998DB82D_963F_FD8E_41DA_5B3EBAD7A609",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998C282D_963F_FD8E_41D7_0CC1E6F0245A",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB8E190_95F3_D98A_41A0_4FDCC87A8232_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998CE82D_963F_FD8E_41E2_22E7D294913E",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998E582A_963F_FD8A_41AA_4F6B1178680E",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998EF82B_963F_FD8A_41D9_254D66292F36",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBBA8D8_95F3_57BA_41D9_609B31735AA3_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8F9C67B1_96DB_7297_41DA_563838F45D3C",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998D082C_963F_FD8E_41C7_C1000173E789",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBB564C_95F3_3A9B_41D8_5ECAFF8A4BBA_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998DE82D_963F_FD8E_41D5_F110CB470884",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_9988D824_963F_FDBE_41DE_D4FDFC78400A",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_99889824_963F_FDBE_41E1_B6FBE21D772A",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_995DE357_95F1_3AB5_41E0_8B70E281AD39_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998F4824_963F_FDBE_41DB_BDC16F788892",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_99892823_963F_FDBA_41A0_D29B62AA8D8C",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FB72F85_95F2_E995_41DF_94BE728C8FD2_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8001BB7B_96D9_B38A_41AD_0F6739D8EE64",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 600
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998D082B_963F_FD8A_41BA_45CF259201E8",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998DF82B_963F_FD8A_41DC_B75654307846",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FBE2007_95F3_5696_41C0_645E5A02C569_0_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8F9F57B1_96DB_7297_41D5_CDBFACEAE5BE",
 "frameCount": 20,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_998F2824_963F_FDBE_41C1_B032A62C420F",
 "frameCount": 24,
 "class": "AnimatedImageResource"
},
{
 "levels": [
  {
   "url": "media/panorama_9FA23D90_95F3_298B_41D7_0366C7B090E0_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 750
  }
 ],
 "rowCount": 5,
 "frameDuration": 41,
 "colCount": 4,
 "id": "AnimatedImageResource_8E5B2450_96D9_D596_41C4_91CEC75E26E8",
 "frameCount": 20,
 "class": "AnimatedImageResource"
}],
 "data": {
  "name": "Player446"
 },
 "paddingLeft": 0,
 "backgroundPreloadEnabled": true
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
