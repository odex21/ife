/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ab2bc3632f814dda21f0";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/san-loader/lib/selector.js?type=script&index=0!./src/checkbox.san":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/san-loader/lib/selector.js?type=script&index=0!./src/checkbox.san ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// <template>
// <div on-click="nonselect($event)">
//     <ul>
//         <li>
//             <label><input type="checkbox" value="all" checked="{= isall =}" indeterminate="{= inde1 =}">全选</label>
//         </li>
//         <li>
//             <label><input type="checkbox" value="errorrik" checked="{= online =}">errorrik</label>
//         </li>
//         <li>
//             <label><input type="checkbox" value="firede" checked="{= online =}">firede</label>
//         </li>
//         <li>
//             <label><input type="checkbox" value="otakustay" checked="{= online =}" indeterminate="{= inde2 =}">otakustay</label>
//         </li>
//         <li>
//             <ul>
//                 <li>
//                     <label><input type="checkbox" value="a" checked="{= otakustay =}">firede</label>
//                 </li>
//                 <li>
//                     <label><input type="checkbox" value="b" checked="{= otakustay =}">otakustay</label>
//                 </li>
//
//             </ul>
//         </li>
//     </ul>
// </div>
// </template>
//
// <script>
/* harmony default export */ __webpack_exports__["default"] = ({
  initData: function () {
    return {
      online: [],
      isall: [],
      otakustay: [],
      inde1: 'false',
      inde2: ''
    };
  },
  attached: function () {
    this.data.set('online', ['errorrik']);
    this.data.set('isall', []);
    this.data.set('otakustay', []);
  },
  nonselect: function (e) {
    if (e.target.nodeName === 'INPUT') {
      let online = this.data.get('online'),
          otakustay = this.data.get('otakustay');
      let self = this;

      switch (e.target.value) {
        //全选
        case 'all':
          {
            if (this.data.get('isall').length !== 0) {
              console.log("click all");
              this.data.set('online', ['errorrik', 'otakustay', 'firede']);
              this.data.set('otakustay', ['a', 'b']);
              this.data.set('inde2', '');
              this.data.set('inde', '', 'force');
              console.log(online);
            } else {
              this.data.set('online', []);
              this.data.set('otakustay', []);
            }

            break;
          }
        //分支全选

        case 'otakustay':
          {
            if (this.data.get('otakustay').length == 2) {
              this.data.set('otakustay', []);
            } else {
              this.data.set('otakustay', ['a', 'b']);
            }

            otakustay = this.data.get('otakustay'); //手动更新otakustay

            check(online, 3, 'inde1', 'isall', ['all'], otakustay, 2);
            break;
          }
        //分支子项选择

        case 'b':
        case 'a':
          {
            console.log("2222222222???!111111111111111111111111"); //返回true就给isall打个标记

            switch (check(otakustay, 2, 'inde2', 'online', ['otakustay'])) {
              case 0:
                {
                  self.data.set('inde1', 'true', 'force');
                }

              case 1:
                {
                  console.log("下一轮检测");
                  online = this.data.get('online'); //手动更新online

                  console.log(online);
                  check(online, 3, 'inde1', 'isall', ['all']);
                }
            }

            break;
          }
        //一级子项判定

        default:
          {
            console.log("default");
            check(online, 3, 'inde1', 'isall', ['all'], otakustay, 2);
          }
      }

      console.log(online.length);
      console.log(online);
      console.log(this.data.get('inde'));
      console.log(this.data.get('all'));
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"); //检查当前数据组是否满了，控制父级的indeterminate的显示

      function check(online, len, inde, isall, all, ex, exlen) {
        //inde,isall is string
        console.log(online.length);
        console.log(len);

        if (online.length === len) {
          console.log("开始判定是否全选");

          if (ex) {
            //给一级数据组用于检测二级数据组是否满了
            console.log(ex.length);

            if (ex.length !== exlen) {
              console.log("???");
              return;
            }
          }

          self.data.set(inde, '', 'force');
          console.log("父选项组");
          console.log(isall);
          console.log("现在点选的checkbox在父的名字");
          console.log(all);
          let ar = self.data.get(isall);
          console.log("已经选了的");
          console.log(ar);
          let j = 0;

          for (let i = 0; i < ar.length; i++) {
            console.log(ar[i]);
            console.log(all[0]);

            if (ar[i] !== all[0]) {
              console.log("!equals");
              j++;
            }
          }

          if (j == ar.length) {
            ar = ar.concat(all);
          }

          console.log("__________________");
          console.log(ar);
          self.data.set(isall, ar); //要改

          console.log("全选了");
          console.log(all[0]);
          console.log(self.data.get('online'));
          console.log(self.data.get('online').length);
          return 1;
        } else if (online.length === 0) {
          console.log("00000000000");
          self.data.set(inde, '', 'force');
          self.data.remove(isall, all[0]);
        } else {
          self.data.set(inde, 'true', 'force');
          console.log("没满！！！ change");
          self.data.remove(isall, all[0]);
          return 0;
        }
      }
    }
  } // </script>
  // indeterminate="{{inde}}

  /* generated by san-loader */

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/san-loader/lib/selector.js?type=script&index=0!./src/input.san":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/san-loader/lib/selector.js?type=script&index=0!./src/input.san ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// <template>
// <div class="inputArea">
//     <h2>基础状态</h2>
//     <ul>
//         <li>
//             <input type="text" value="{= content1 =}" placeholder="请输入文字" class="{{isError1 ? 'error' : ''}}" on-blur="check(1)">
//             <p id="input1" s-if="{{isError1}}">里面需要有中文</p>
//         </li>
//         <li>
//             <input type="text" value="{= content2 =}" placeholder="请输入文字" class="{{isError2 ? 'error' : ''}}" on-blur="check(2)">
//             <p id="input2" s-if="{{isError2}}">里面需要有中文</p>
//         </li>
//
//     </ul>
//     <input type="text" value="{= content3 =}" placeholder="请输入文字" disabled>
//
// </div>
// </template>
//
// <script>
/* harmony default export */ __webpack_exports__["default"] = ({
  initData: function () {
    return {
      isError1: false,
      isError2: false,
      content: ''
    };
  },
  check: function (num) {
    let t = this.data.get('isError');
    let reg = /[\u4e00-\u9fa5]/,
        c = this.data.get('content' + num);
    t = reg.test(c);
    this.data.set('isError' + num, !t);
    console.log("??");
    console.log(t);
  } // </script>

  /* generated by san-loader */

});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/main.css":
/*!************************************************!*\
  !*** ./node_modules/css-loader!./src/main.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "*{\r\n\r\n}\r\nbody{\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\ntable tr td{\r\n    border: solid 3px red;\r\n    padding: 10px;\r\n}\r\n\r\n.titleArea{\r\n    background-color: rgb(77, 74, 74);\r\n    padding: 0;\r\n    padding-left: 20px;\r\n    margin: 0;\r\n    height: 200px;\r\n}\r\n.cname{\r\n    padding-top: 30px;\r\n    padding-left: 0;\r\n    margin-bottom: 10px;\r\n    color: white;\r\n    font-size: 30px;\r\n    font-weight: normal;\r\n    position: relative;\r\n}\r\n\r\n.name{\r\n    position: absolute;\r\n    width: 30px;\r\n    height: 17px;\r\n    left: 115px;\r\n    top: 38px;\r\n    font-size: 13px;\r\n    color: rgb(167, 167, 167);\r\n    text-align: center;\r\n}\r\n\r\n.logo{\r\n    position: absolute;\r\n    width: 30px;\r\n    left: 116px;\r\n    top: 26px;\r\n    font-size: 10px;\r\n    color: rgb(51, 50, 50);\r\n    background-color: grey;\r\n    text-align: center;\r\n}\r\n.content{\r\n    color:rgb(148, 146, 146);\r\n    font-size: 15px;\r\n}\r\nh2{\r\n    color: rgba(0, 0, 0, 0.808);\r\n    padding-left: 10px;\r\n    position: relative;\r\n}\r\nh2::before{\r\n    content: \"\";\r\n    background: rgba(0, 0, 0, 0.808);\r\n    width: 4px;\r\n    height: 70%;\r\n    position: absolute;\r\n    bottom: 3px;\r\n    left: 0px;\r\n}\r\n.inputArea{\r\n    padding: 20px;\r\n}\r\n\r\ninput::placeholder{\r\n    color: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\ninput[type=text]{\r\n    width: 300px;\r\n    height: 30px;\r\n    padding-left: 5px;\r\n    border: solid rgba(0, 0, 0, 0.151) 1.5px;\r\n    margin: 20px;\r\n    margin-left: 0;\r\n    font-size: 12px;\r\n    position: relative;\r\n}\r\ninput:focus{\r\n    outline: none;\r\n    border: rgba(0, 0, 0, 0.4) solid 1.5px;\r\n\r\n}\r\n\r\ninput:hover{\r\n    border: rgba(0, 0, 0, 0.4) solid 1.5px;\r\n\r\n}\r\ninput:disabled{\r\n    background-color: rgba(0, 0, 0, 0.021);\r\n    color: rgba(0, 0, 0, 0.582);\r\n}\r\ninput[disabled]:hover{\r\n    border: solid rgba(0, 0, 0, 0.151) 1.5px;\r\n}\r\n.error{\r\n    border: rgba(253, 0, 0, 0.61) solid 1.5px !important;\r\n\r\n}\r\n  \r\nli{\r\n \r\n    position: relative;\r\n    list-style: none;\r\n    margin: 0px;\r\n}\r\n.inputArea ul{\r\n    display: flex;\r\n    flex-wrap: nowrap;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n#input2{\r\n    position: absolute;\r\n    width: 110px;\r\n    top: 12px;\r\n    left: 320px;\r\n    color: red;\r\n    font-size: 15px;\r\n}\r\n\r\n#input1{\r\n    position: absolute;\r\n    top: -30px;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n    width: 150px;\r\n    height: 30px;\r\n    color:rgba(255, 0, 0, 0.8);\r\n    line-height: 30px;\r\n    background: rgba(255, 138, 138, 0.363);\r\n    border-radius: 6px;\r\n}\r\n#input1::after{\r\n    content: \"\";\r\n    width: 0;\r\n    height: 0;\r\n    border: solid 4px rgba(0, 0, 0, 0);\r\n    border-top: solid 5px  rgba(255, 138, 138, 0.363);\r\n    position: absolute;\r\n    top: 30px;\r\n    left: 45px;\r\n}\r\n\r\n/*\r\n*/", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/html-loader/index.js?minimize=false!./node_modules/san-loader/lib/selector.js?type=template&index=0!./src/checkbox.san":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/html-loader?minimize=false!./node_modules/san-loader/lib/selector.js?type=template&index=0!./src/checkbox.san ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div on-click=\"nonselect($event)\">\r\n    <ul>\r\n        <li>\r\n            <label><input type=\"checkbox\" value=\"all\" checked=\"{= isall =}\" indeterminate=\"{= inde1 =}\">全选</label>\r\n        </li>\r\n        <li>\r\n            <label><input type=\"checkbox\" value=\"errorrik\" checked=\"{= online =}\">errorrik</label>\r\n        </li>\r\n        <li>\r\n            <label><input type=\"checkbox\" value=\"firede\" checked=\"{= online =}\">firede</label>\r\n        </li>\r\n        <li>\r\n            <label><input type=\"checkbox\" value=\"otakustay\" checked=\"{= online =}\" indeterminate=\"{= inde2 =}\">otakustay</label>\r\n        </li>\r\n        <li>\r\n            <ul>\r\n                <li>\r\n                    <label><input type=\"checkbox\" value=\"a\" checked=\"{= otakustay =}\">firede</label>\r\n                </li>\r\n                <li>\r\n                    <label><input type=\"checkbox\" value=\"b\" checked=\"{= otakustay =}\">otakustay</label>\r\n                </li>\r\n\r\n            </ul>\r\n        </li>\r\n    </ul>\r\n</div>\r\n";

/***/ }),

/***/ "./node_modules/html-loader/index.js?minimize=false!./node_modules/san-loader/lib/selector.js?type=template&index=0!./src/input.san":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/html-loader?minimize=false!./node_modules/san-loader/lib/selector.js?type=template&index=0!./src/input.san ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"inputArea\">\r\n    <h2>基础状态</h2>\r\n    <ul>\r\n        <li>\r\n            <input type=\"text\" value=\"{= content1 =}\" placeholder=\"请输入文字\" class=\"{{isError1 ? 'error' : ''}}\" on-blur=\"check(1)\">\r\n            <p id=\"input1\" s-if=\"{{isError1}}\">里面需要有中文</p>\r\n        </li>\r\n        <li>\r\n            <input type=\"text\" value=\"{= content2 =}\" placeholder=\"请输入文字\" class=\"{{isError2 ? 'error' : ''}}\" on-blur=\"check(2)\">\r\n            <p id=\"input2\" s-if=\"{{isError2}}\">里面需要有中文</p>\r\n        </li>\r\n        \r\n    </ul>\r\n    <input type=\"text\" value=\"{= content3 =}\" placeholder=\"请输入文字\" disabled>\r\n    \r\n</div>\r\n";

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/san/dist/san.dev.js":
/*!******************************************!*\
  !*** ./node_modules/san/dist/san.dev.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {/**
 * San
 * Copyright 2016 Baidu Inc. All rights reserved.
 *
 * @file 主文件
 * @author errorrik(errorrik@gmail.com)
 *         otakustay(otakustay@gmail.com)
 *         junmer(junmer@foxmail.com)
 */

(function (root) {
    // 人工调整打包代码顺序，通过注释手工写一些依赖
//     // require('./util/guid');
//     // require('./util/empty');
//     // require('./util/extend');
//     // require('./util/inherits');
//     // require('./util/each');
//     // require('./util/contains');
//     // require('./util/bind');
//     // require('./browser/on');
//     // require('./browser/un');
//     // require('./browser/svg-tags');
//     // require('./browser/create-el');
//     // require('./browser/remove-el');
//     // require('./util/next-tick');
//     // require('./browser/ie');
//     // require('./browser/ie-old-than-9');
//     // require('./browser/input-event-compatible');
//     // require('./browser/auto-close-tags');
//     // require('./util/data-types.js');
//     // require('./util/create-data-types-checker.js');
//     // require('./parser/walker');
//     // require('./parser/create-a-node');
//     // require('./parser/parse-template');
//     // require('./runtime/change-expr-compare');
//     // require('./runtime/data-change-type');
//     // require('./runtime/default-filters');
//     // require('./view/life-cycle');
//     // require('./view/node-type');
//     // require('./view/get-prop-handler');
//     // require('./view/is-data-change-by-element');
//     // require('./view/event-declaration-listener');
//     // require('./view/create-node');


    /**
 * @file 生成唯一id
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 唯一id的起始值
 *
 * @inner
 * @type {number}
 */
var guidIndex = 1;

/**
 * 唯一id的前缀
 *
 * @inner
 * @type {string}
 */
var guidPrefix = (new Date()).getTime().toString(16).slice(8);

/**
 * 获取唯一id
 *
 * @inner
 * @return {string} 唯一id
 */
function guid() {
    return '_' + guidPrefix + (guidIndex++);
}

// exports = module.exports = guid;


/**
 * @file 空函数
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 啥都不干
 */
function empty() {}

// exports = module.exports = empty;


/**
 * @file 属性拷贝
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 对象属性拷贝
 *
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @return {Object} 返回目标对象
 */
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var value = source[key];
            if (typeof value !== 'undefined') {
                target[key] = value;
            }
        }
    }

    return target;
}

// exports = module.exports = extend;


/**
 * @file 构建类之间的继承关系
 * @author errorrik(errorrik@gmail.com)
 */

// var extend = require('./extend');

/**
 * 构建类之间的继承关系
 *
 * @param {Function} subClass 子类函数
 * @param {Function} superClass 父类函数
 */
function inherits(subClass, superClass) {
    /* jshint -W054 */
    var subClassProto = subClass.prototype;
    var F = new Function();
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    extend(subClass.prototype, subClassProto);
    /* jshint +W054 */
}

// exports = module.exports = inherits;


/**
 * @file 遍历数组
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 遍历数组集合
 *
 * @param {Array} array 数组源
 * @param {function(Any,number):boolean} iterator 遍历函数
 */
function each(array, iterator) {
    if (array && array.length > 0) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (iterator(array[i], i) === false) {
                break;
            }
        }
    }
}

// exports = module.exports = each;


/**
 * @file 判断数组中是否包含某项
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('./each');

/**
 * 判断数组中是否包含某项
 *
 * @param {Array} array 数组
 * @param {*} value 包含的项
 * @return {boolean}
 */
function contains(array, value) {
    var result = false;
    each(array, function (item) {
        result = item === value;
        return !result;
    });

    return result;
}

// exports = module.exports = contains;


/**
 * @file bind函数
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * Function.prototype.bind 方法的兼容性封装
 *
 * @param {Function} func 要bind的函数
 * @param {Object} thisArg this指向对象
 * @param {...*} args 预设的初始参数
 * @return {Function}
 */
function bind(func, thisArg) {
    var nativeBind = Function.prototype.bind;
    var slice = Array.prototype.slice;
    // #[begin] allua
    if (nativeBind && func.bind === nativeBind) {
    // #[end]
        return nativeBind.apply(func, slice.call(arguments, 1));
    // #[begin] allua
    }

    var args = slice.call(arguments, 2);
    return function () {
        return func.apply(thisArg, args.concat(slice.call(arguments)));
    };
    // #[end]
}

// exports = module.exports = bind;


/**
 * @file DOM 事件挂载
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * DOM 事件挂载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function on(el, eventName, listener, capture) {
    // #[begin] allua
    if (el.addEventListener) {
    // #[end]
        el.addEventListener(eventName, listener, capture);
    // #[begin] allua
    }
    else {
        el.attachEvent('on' + eventName, listener);
    }
    // #[end]
}

// exports = module.exports = on;


/**
 * @file DOM 事件卸载
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * DOM 事件卸载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 * @param {Function} listener 监听函数
 * @param {boolean} capture 是否是捕获阶段
 */
function un(el, eventName, listener, capture) {
    // #[begin] allua
    if (el.addEventListener) {
    // #[end]
        el.removeEventListener(eventName, listener, capture);
    // #[begin] allua
    }
    else {
        el.detachEvent('on' + eventName, listener);
    }
    // #[end]
}

// exports = module.exports = un;


/**
 * @file 将字符串逗号切分返回对象
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');

/**
 * 将字符串逗号切分返回对象
 *
 * @param {string} source 源字符串
 * @return {Object}
 */
function splitStr2Obj(source) {
    var result = {};
    each(
        source.split(','),
        function (key) {
            result[key] = key;
        }
    );
    return result;
}

// exports = module.exports = splitStr2Obj;


/**
 * @file SVG标签表
 * @author errorrik(errorrik@gmail.com)
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * svgTags
 *
 * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
 * @type {Object}
 */
var svgTags = splitStr2Obj(''
    // structure
    + 'svg,g,defs,desc,metadata,symbol,use,'
    // image & shape
    + 'image,path,rect,circle,line,ellipse,polyline,polygon,'
    // text
    + 'text,tspan,tref,textpath,'
    // other
    + 'marker,pattern,clippath,mask,filter,cursor,view,animate,'
    // font
    + 'font,font-face,glyph,missing-glyph,'
    // camel
    + 'animateColor,animateMotion,animateTransform,textPath,foreignObject'
);

// exports = module.exports = svgTags;


/**
 * @file DOM创建
 * @author errorrik(errorrik@gmail.com)
 */

// var svgTags = require('./svg-tags');

/**
 * 创建 DOM 元素
 *
 * @param  {string} tagName tagName
 * @return {HTMLElement}
 */
function createEl(tagName) {
    if (svgTags[tagName]) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    return document.createElement(tagName);
}

// exports = module.exports = createEl;


/**
 * @file 移除DOM
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 将 DOM 从页面中移除
 *
 * @param {HTMLElement} el DOM元素
 */
function removeEl(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

// exports = module.exports = removeEl;


/**
 * @file 在下一个时间周期运行任务
 * @author errorrik(errorrik@gmail.com)
 */

// 该方法参照了vue2.5.0的实现，感谢vue团队
// SEE: https://github.com/vuejs/vue/blob/0948d999f2fddf9f90991956493f976273c5da1f/src/core/util/env.js#L68


// var bind = require('./bind');

/**
 * 下一个周期要执行的任务列表
 *
 * @inner
 * @type {Array}
 */
var nextTasks = [];

/**
 * 执行下一个周期任务的函数
 *
 * @inner
 * @type {Function}
 */
var nextHandler;

/**
 * 浏览器是否支持原生Promise
 * 对Promise做判断，是为了禁用一些不严谨的Promise的polyfill
 *
 * @inner
 * @type {boolean}
 */
var isNativePromise = typeof Promise === 'function' && /native code/.test(Promise);

/**
 * 在下一个时间周期运行任务
 *
 * @inner
 * @param {Function} fn 要运行的任务函数
 * @param {Object=} thisArg this指向对象
 */
function nextTick(fn, thisArg) {
    if (thisArg) {
        fn = bind(fn, thisArg);
    }
    nextTasks.push(fn);

    if (nextHandler) {
        return;
    }

    nextHandler = function () {
        var tasks = nextTasks.slice(0);
        nextTasks = [];
        nextHandler = null;

        for (var i = 0, l = tasks.length; i < l; i++) {
            tasks[i]();
        }
    };

    // 非标准方法，但是此方法非常吻合要求。
    if (typeof setImmediate === 'function') {
        setImmediate(nextHandler);
    }
    // 用MessageChannel去做setImmediate的polyfill
    // 原理是将新的message事件加入到原有的dom events之后
    else if (typeof MessageChannel === 'function') {
        var channel = new MessageChannel();
        var port = channel.port2;
        channel.port1.onmessage = nextHandler;
        port.postMessage(1);
    }
    // for native app
    else if (isNativePromise) {
        Promise.resolve().then(nextHandler);
    }
    else {
        setTimeout(nextHandler, 0);
    }
}

// exports = module.exports = nextTick;


/**
 * @file ie版本号
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 从userAgent中ie版本号的匹配信息
 *
 * @type {Array}
 */
var ieVersionMatch = typeof navigator !== 'undefined'
    && navigator.userAgent.match(/msie\s*([0-9]+)/i);

/**
 * ie版本号，非ie时为0
 *
 * @type {number}
 */
var ie = ieVersionMatch ? ieVersionMatch[1] - 0 : 0;

// exports = module.exports = ie;


/**
 * @file 是否 IE 并且小于 9
 * @author errorrik(errorrik@gmail.com)
 */

// var ie = require('./ie');

// HACK:
// 1. IE8下，设置innerHTML时如果以html comment开头，comment会被自动滤掉
//    为了保证stump存在，需要设置完html后，createComment并appendChild/insertBefore
// 2. IE8下，innerHTML还不支持custom element，所以需要用div替代，不用createElement
// 3. 虽然IE8已经优化了字符串+连接，碎片化连接性能不再退化
//    但是由于上面多个兼容场景都用 < 9 判断，所以字符串连接也沿用
//    所以结果是IE8下字符串连接用的是数组join的方式

// #[begin] allua
/**
 * 是否 IE 并且小于 9
 */
var ieOldThan9 = ie && ie < 9;
// #[end]

// exports = module.exports = ieOldThan9;


/**
 * @file DOM 事件挂载
 * @author dafrok(o.o@mug.dog)
 */

/**
 * DOM 事件挂载
 *
 * @inner
 * @param {HTMLElement} el DOM元素
 * @param {string} eventName 事件名
 */
function trigger(el, eventName) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
    el.dispatchEvent(event);
}

// exports = module.exports = trigger;


/**
 * @file 解决 IE9 在表单元素中删除字符时不触发事件的问题
 * @author dafrok(o.o@mug.dog)
 */

// var ie = require('./ie');
// var on = require('./on');
// var trigger = require('./trigger');

// #[begin] allua
if (ie === 9) {
    on(document, 'selectionchange', function () {
        var el = document.activeElement;
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
            trigger(el, 'input');
        }
    });
}
// #[end]


/**
 * @file 自闭合标签表
 * @author errorrik(errorrik@gmail.com)
 */

// var splitStr2Obj = require('../util/split-str-2-obj');

/**
 * 自闭合标签列表
 *
 * @type {Object}
 */
var autoCloseTags = splitStr2Obj('area,base,br,col,embed,hr,img,input,keygen,param,source,track,wbr');

// exports = module.exports = autoCloseTags;


/**
 * @file data types
 * @author leon <ludafa@outlook.com>
 */

// var bind = require('./bind');
// var empty = require('./empty');
// var extend = require('./extend');

// #[begin] error
var ANONYMOUS_CLASS_NAME = '<<anonymous>>';

/**
 * 获取精确的类型
 *
 * @NOTE 如果 obj 是一个 DOMElement，我们会返回 `element`；
 *
 * @param  {*} obj 目标
 * @return {string}
 */
function getDataType(obj) {

    if (obj && obj.nodeType === 1) {
        return 'element';
    }

    return Object.prototype.toString
        .call(obj)
        .slice(8, -1)
        .toLowerCase();
}
// #[end]

/**
 * 创建链式的数据类型校验器
 *
 * @param  {Function} validate 真正的校验器
 * @return {Function}
 */
function createChainableChecker(validate) {
    var chainedChecker = function () {};
    chainedChecker.isRequired = empty;

    // 只在 error 功能启用时才有实际上的 dataTypes 检测
    // #[begin] error
    var checkType = function (isRequired, data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        componentName = componentName || ANONYMOUS_CLASS_NAME;

        // 如果是 null 或 undefined，那么要提前返回啦
        if (dataValue == null) {
            // 是 required 就报错
            if (isRequired) {
                throw new Error('[SAN ERROR] '
                    + 'The `' + dataName + '` '
                    + 'is marked as required in `' + componentName + '`, '
                    + 'but its value is ' + dataType
                );
            }
            // 不是 required，那就是 ok 的
            return;
        }

        validate(data, dataName, componentName, fullDataName);

    };

    chainedChecker = bind(checkType, null, false);
    chainedChecker.isRequired = bind(checkType, null, true);
    // #[end]



    return chainedChecker;

}

// #[begin] error
/**
 * 生成主要类型数据校验器
 *
 * @param  {string} type 主类型
 * @return {Function}
 */
function createPrimaryTypeChecker(type) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== type) {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected ' + type + ')'
            );
        }

    });

}



/**
 * 生成 arrayOf 校验器
 *
 * @param  {Function} arrayItemChecker 数组中每项数据的校验器
 * @return {Function}
 */
function createArrayOfChecker(arrayItemChecker) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (typeof arrayItemChecker !== 'function') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `arrayOf`, expected `function`'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected array)'
            );
        }

        for (var i = 0, len = dataValue.length; i < len; i++) {
            arrayItemChecker(dataValue, i, componentName, fullDataName + '[' + i + ']');
        }

    });

}

/**
 * 生成 instanceOf 检测器
 *
 * @param  {Function|Class} expectedClass 期待的类
 * @return {Function}
 */
function createInstanceOfChecker(expectedClass) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        var dataValue = data[dataName];

        if (dataValue instanceof expectedClass) {
            return;
        }

        var dataValueClassName = dataValue.constructor && dataValue.constructor.name
            ? dataValue.constructor.name
            : ANONYMOUS_CLASS_NAME;

        var expectedClassName = expectedClass.name || ANONYMOUS_CLASS_NAME;

        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
            + '(' + dataValueClassName + ' supplied to ' + componentName + ', '
            + 'expected instance of ' + expectedClassName + ')'
        );


    });

}

/**
 * 生成 shape 校验器
 *
 * @param  {Object} shapeTypes shape 校验规则
 * @return {Function}
 */
function createShapeChecker(shapeTypes) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(shapeTypes) !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `shape`, expected `object`'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected object)'
            );
        }

        for (var shapeKeyName in shapeTypes) {
            if (shapeTypes.hasOwnProperty(shapeKeyName)) {
                var checker = shapeTypes[shapeKeyName];
                if (typeof checker === 'function') {
                    checker(dataValue, shapeKeyName, componentName, fullDataName + '.' + shapeKeyName);
                }
            }
        }

    });

}

/**
 * 生成 oneOf 校验器
 *
 * @param  {Array} expectedEnumValues 期待的枚举值
 * @return {Function}
 */
function createOneOfChecker(expectedEnumValues) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(expectedEnumValues) !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `oneOf`, array is expected.'
            );
        }

        var dataValue = data[dataName];

        for (var i = 0, len = expectedEnumValues.length; i < len; i++) {
            if (dataValue === expectedEnumValues[i]) {
                return;
            }
        }

        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + fullDataName + '` of value'
            + '(`' + dataValue + '` supplied to ' + componentName + ', '
            + 'expected one of ' + expectedEnumValues.join(',') + ')'
        );

    });

}

/**
 * 生成 oneOfType 校验器
 *
 * @param  {Array<Function>} expectedEnumOfTypeValues 期待的枚举类型
 * @return {Function}
 */
function createOneOfTypeChecker(expectedEnumOfTypeValues) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (getDataType(expectedEnumOfTypeValues) !== 'array') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `oneOf`, array is expected.'
            );
        }

        var dataValue = data[dataName];

        for (var i = 0, len = expectedEnumOfTypeValues.length; i < len; i++) {

            var checker = expectedEnumOfTypeValues[i];

            if (typeof checker !== 'function') {
                continue;
            }

            try {
                checker(data, dataName, componentName, fullDataName);
                // 如果 checker 完成校验没报错，那就返回了
                return;
            }
            catch (e) {
                // 如果有错误，那么应该把错误吞掉
            }

        }

        // 所有的可接受 type 都失败了，才丢一个异常
        throw new Error('[SAN ERROR] '
            + 'Invalid ' + componentName + ' data `' + dataName + '` of value'
            + '(`' + dataValue + '` supplied to ' + componentName + ')'
        );

    });

}

/**
 * 生成 objectOf 校验器
 *
 * @param  {Function} typeChecker 对象属性值校验器
 * @return {Function}
 */
function createObjectOfChecker(typeChecker) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName) {

        if (typeof typeChecker !== 'function') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `objectOf`, expected function'
            );
        }

        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);

        if (dataType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid ' + componentName + ' data `' + dataName + '` of type'
                + '(' + dataType + ' supplied to ' + componentName + ', '
                + 'expected object)'
            );
        }

        for (var dataKeyName in dataValue) {
            if (dataValue.hasOwnProperty(dataKeyName)) {
                typeChecker(
                    dataValue,
                    dataKeyName,
                    componentName,
                    fullDataName + '.' + dataKeyName
                );
            }
        }


    });

}

/**
 * 生成 exact 校验器
 *
 * @param  {Object} shapeTypes object 形态定义
 * @return {Function}
 */
function createExactChecker(shapeTypes) {

    return createChainableChecker(function (data, dataName, componentName, fullDataName, secret) {

        if (getDataType(shapeTypes) !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Data `' + dataName + '` of `' + componentName + '` has invalid '
                + 'DataType notation inside `exact`'
            );
        }

        var dataValue = data[dataName];
        var dataValueType = getDataType(dataValue);

        if (dataValueType !== 'object') {
            throw new Error('[SAN ERROR] '
                + 'Invalid data `' + fullDataName + '` of type `' + dataValueType + '`'
                + '(supplied to ' + componentName + ', expected `object`)'
            );
        }

        var allKeys = {};

        // 先合入 shapeTypes
        extend(allKeys, shapeTypes);
        // 再合入 dataValue
        extend(allKeys, dataValue);
        // 保证 allKeys 的类型正确

        for (var key in allKeys) {
            if (allKeys.hasOwnProperty(key)) {
                var checker = shapeTypes[key];

                // dataValue 中有一个多余的数据项
                if (!checker) {
                    throw new Error('[SAN ERROR] '
                        + 'Invalid data `' + fullDataName + '` key `' + key + '` '
                        + 'supplied to `' + componentName + '`. '
                        + '(`' + key + '` is not defined in `DataTypes.exact`)'
                    );
                }

                if (!(key in dataValue)) {
                    throw new Error('[SAN ERROR] '
                        + 'Invalid data `' + fullDataName + '` key `' + key + '` '
                        + 'supplied to `' + componentName + '`. '
                        + '(`' + key + '` is marked `required` in `DataTypes.exact`)'
                    );
                }

                checker(
                    dataValue,
                    key,
                    componentName,
                    fullDataName + '.' + key,
                    secret
                );

            }
        }

    });

}
// #[end]



/* eslint-disable fecs-valid-var-jsdoc */
var DataTypes = {
    array: createChainableChecker(empty),
    object: createChainableChecker(empty),
    func: createChainableChecker(empty),
    string: createChainableChecker(empty),
    number: createChainableChecker(empty),
    bool: createChainableChecker(empty),
    symbol: createChainableChecker(empty),
    any: createChainableChecker,
    arrayOf: createChainableChecker,
    instanceOf: createChainableChecker,
    shape: createChainableChecker,
    oneOf: createChainableChecker,
    oneOfType: createChainableChecker,
    objectOf: createChainableChecker,
    exact: createChainableChecker
};

// #[begin] error
DataTypes = {

    any: createChainableChecker(empty),

    // 类型检测
    array: createPrimaryTypeChecker('array'),
    object: createPrimaryTypeChecker('object'),
    func: createPrimaryTypeChecker('function'),
    string: createPrimaryTypeChecker('string'),
    number: createPrimaryTypeChecker('number'),
    bool: createPrimaryTypeChecker('boolean'),
    symbol: createPrimaryTypeChecker('symbol'),

    // 复合类型检测
    arrayOf: createArrayOfChecker,
    instanceOf: createInstanceOfChecker,
    shape: createShapeChecker,
    oneOf: createOneOfChecker,
    oneOfType: createOneOfTypeChecker,
    objectOf: createObjectOfChecker,
    exact: createExactChecker

};
/* eslint-enable fecs-valid-var-jsdoc */
// #[end]


// module.exports = DataTypes;


/**
 * @file 创建数据检测函数
 * @author leon<ludafa@outlook.com>
 */


// #[begin] error

/**
 * 创建数据检测函数
 *
 * @param  {Object} dataTypes     数据格式
 * @param  {string} componentName 组件名
 * @return {Function}
 */
function createDataTypesChecker(dataTypes, componentName) {

    /**
     * 校验 data 是否满足 data types 的格式
     *
     * @param  {*} data 数据
     */
    return function (data) {

        for (var dataTypeName in dataTypes) {

            if (dataTypes.hasOwnProperty(dataTypeName)) {

                var dataTypeChecker = dataTypes[dataTypeName];

                if (typeof dataTypeChecker !== 'function') {
                    throw new Error('[SAN ERROR] '
                        + componentName + ':' + dataTypeName + ' is invalid; '
                        + 'it must be a function, usually from san.DataTypes'
                    );
                }

                dataTypeChecker(
                    data,
                    dataTypeName,
                    componentName,
                    dataTypeName
                );


            }
        }

    };

}

// #[end]

// module.exports = createDataTypesChecker;


/**
 * @file 字符串源码读取类
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 字符串源码读取类，用于模板字符串解析过程
 *
 * @class
 * @param {string} source 要读取的字符串
 */
function Walker(source) {
    this.source = source;
    this.len = this.source.length;
    this.index = 0;
}

/**
 * 获取当前字符码
 *
 * @return {number}
 */
Walker.prototype.currentCode = function () {
    return this.source.charCodeAt(this.index);
};

/**
 * 截取字符串片段
 *
 * @param {number} start 起始位置
 * @param {number} end 结束位置
 * @return {string}
 */
Walker.prototype.cut = function (start, end) {
    return this.source.slice(start, end);
};

/**
 * 向前读取字符
 *
 * @param {number} distance 读取字符数
 */
Walker.prototype.go = function (distance) {
    this.index += distance;
};

/**
 * 读取下一个字符，返回下一个字符的 code
 *
 * @return {number}
 */
Walker.prototype.nextCode = function () {
    this.go(1);
    return this.currentCode();
};

/**
 * 获取相应位置字符的 code
 *
 * @param {number} index 字符位置
 * @return {number}
 */
Walker.prototype.charCode = function (index) {
    return this.source.charCodeAt(index);
};

/**
 * 向前读取字符，直到遇到指定字符再停止
 * 未指定字符时，当遇到第一个非空格、制表符的字符停止
 *
 * @param {number=} charCode 指定字符的code
 * @return {boolean} 当指定字符时，返回是否碰到指定的字符
 */
Walker.prototype.goUntil = function (charCode) {
    var code;
    while (this.index < this.len && (code = this.currentCode())) {
        switch (code) {
            // 空格 space
            case 32:
            // 制表符 tab
            case 9:
            // \r
            case 13:
            // \n
            case 10:
                this.index++;
                break;
            default:
                if (code === charCode) {
                    this.index++;
                    return 1;
                }
                return;
        }
    }
};

/**
 * 向前读取符合规则的字符片段，并返回规则匹配结果
 *
 * @param {RegExp} reg 字符片段的正则表达式
 * @param {boolean} isMatchStart 是否必须匹配当前位置
 * @return {Array?}
 */
Walker.prototype.match = function (reg, isMatchStart) {
    reg.lastIndex = this.index;

    var match = reg.exec(this.source);
    if (match && (!isMatchStart || this.index === match.index)) {
        this.index = reg.lastIndex;
        return match;
    }
};

// exports = module.exports = Walker;


/**
 * @file 模板解析生成的抽象节点
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 创建模板解析生成的抽象节点
 *
 * @param {Object=} options 节点参数
 * @param {string=} options.tagName 标签名
 * @param {ANode=} options.parent 父节点
 * @param {boolean=} options.textExpr 文本节点表达式对象
 * @return {Object}
 */
function createANode(options) {
    options = options || {};

    if (!options.textExpr) {
        options.directives = options.directives || {};
        options.props = options.props || [];
        options.events = options.events || [];
        options.children = options.children || [];
    }

    return options;
}

// exports = module.exports = createANode;


/**
 * @file 把 kebab case 字符串转换成 camel case
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 把 kebab case 字符串转换成 camel case
 *
 * @param {string} source 源字符串
 * @return {string}
 */
function kebab2camel(source) {
    return source.replace(/-+(.)/ig, function (match, alpha) {
        return alpha.toUpperCase();
    });
}

// exports = module.exports = kebab2camel;


/**
 * @file 表达式类型
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 表达式类型
 *
 * @const
 * @type {Object}
 */
var ExprType = {
    STRING: 1,
    NUMBER: 2,
    BOOL: 3,
    ACCESSOR: 4,
    INTERP: 5,
    CALL: 6,
    TEXT: 7,
    BINARY: 8,
    UNARY: 9,
    TERTIARY: 10,
    OBJECT: 11,
    ARRAY: 12
};

// exports = module.exports = ExprType;


/**
 * @file 创建访问表达式对象
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');

/**
 * 创建访问表达式对象
 *
 * @param {Array} paths 访问路径
 * @return {Object}
 */
function createAccessor(paths) {
    return {
        type: 4,
        paths: paths
    };
}

// exports = module.exports = createAccessor;


/**
 * @file 读取字符串
 * @author errorrik(errorrik@gmail.com)
 */


// var ExprType = require('./expr-type');

/**
 * 读取字符串
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readString(walker) {
    var startCode = walker.currentCode();
    var startIndex = walker.index;
    var charCode;

    walkLoop: while ((charCode = walker.nextCode())) {
        switch (charCode) {
            case 92: // \
                walker.go(1);
                break;
            case startCode:
                walker.go(1);
                break walkLoop;
        }
    }

    var literal = walker.cut(startIndex, walker.index);
    return {
        type: 1,
        // 处理字符转义
        value: (new Function('return ' + literal))()
    };
}

// exports = module.exports = readString;


/**
 * @file 读取一元表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readString = require('./read-string');
// var readNumber = require('./read-number');
// var readCall = require('./read-call');
// var readParenthesizedExpr = require('./read-parenthesized-expr');
// var readTertiaryExpr = require('./read-tertiary-expr');


/**
 * 读取一元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readUnaryExpr(walker) {
    walker.goUntil();

    switch (walker.currentCode()) {
        case 33: // !
            walker.go(1);
            return {
                type: 9,
                expr: readUnaryExpr(walker),
                operator: 33
            };

        case 34: // "
        case 39: // '
            return readString(walker);

        case 45: // -
        // number
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            return readNumber(walker);

        case 40: // (
            return readParenthesizedExpr(walker);

        // array literal
        case 91: // [
            walker.go(1);
            var arrItems = [];
            while (!walker.goUntil(93)) { // ]
                var item = {};
                arrItems.push(item);

                if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
                    item.spread = true;
                }

                item.expr = readTertiaryExpr(walker);
                walker.goUntil(44); // ,
            }

            return {
                type: 12,
                items: arrItems
            };

        // object literal
        case 123: // {
            walker.go(1);
            var objItems = [];

            while (!walker.goUntil(125)) { // }
                var item = {};
                objItems.push(item);

                if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
                    item.spread = true;
                    item.expr = readTertiaryExpr(walker);
                }
                else {
                    // #[begin] error
                    var walkerIndexBeforeName = walker.index;
                    // #[end]

                    item.name = readUnaryExpr(walker);

                    // #[begin] error
                    if (item.name.type > 4) {
                        throw new Error(
                            '[SAN FATAL] unexpect object name: '
                            + walker.cut(walkerIndexBeforeName, walker.index)
                        );
                    }
                    // #[end]

                    if (walker.goUntil(58)) { // :
                        item.expr = readTertiaryExpr(walker);
                    }
                    else {
                        item.expr = item.name;
                    }

                    if (item.name.type === 4) {
                        item.name = item.name.paths[0];
                    }
                }

                walker.goUntil(44); // ,
            }

            return {
                type: 11,
                items: objItems
            };
    }

    return readCall(walker);
}

// exports = module.exports = readUnaryExpr;


/**
 * @file 读取数字
 * @author errorrik(errorrik@gmail.com)
 */


// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取数字
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readNumber(walker) {
    var match = walker.match(/\s*(-?[0-9]+(\.[0-9]+)?)/g, 1);

    if (match) {
        return {
            type: 2,
            value: +match[1]
        };
    }
    else if (walker.currentCode() === 45) {
        walker.go(1);
        return {
            type: 9,
            expr: readUnaryExpr(walker),
            operator: 45
        };
    }
}

// exports = module.exports = readNumber;


/**
 * @file 读取ident
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 读取ident
 * 这里的 ident 指标识符(identifier)，也就是通常意义上的变量名
 * 这里默认的变量名规则为：由美元符号($)、数字、字母或者下划线(_)构成的字符串
 *
 * @inner
 * @param {Walker} walker 源码读取对象
 * @return {string}
 */
function readIdent(walker) {
    var match = walker.match(/\s*([\$0-9a-z_]+)/ig, 1);

    // #[begin] error
    if (!match) {
        throw new Error('[SAN FATAL] expect an ident: ' + walker.cut(walker.index));
    }
    // #[end]

    return match[1];
}

// exports = module.exports = readIdent;


/**
 * @file 读取三元表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readLogicalORExpr = require('./read-logical-or-expr');

/**
 * 读取三元表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readTertiaryExpr(walker) {
    var conditional = readLogicalORExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 63) { // ?
        walker.go(1);
        var yesExpr = readTertiaryExpr(walker);
        walker.goUntil();

        if (walker.currentCode() === 58) { // :
            walker.go(1);
            return {
                type: 10,
                segs: [
                    conditional,
                    yesExpr,
                    readTertiaryExpr(walker)
                ]
            };
        }
    }

    return conditional;
}

// exports = module.exports = readTertiaryExpr;


/**
 * @file 读取访问表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var createAccessor = require('./create-accessor');
// var readIdent = require('./read-ident');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取访问表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAccessor(walker) {
    var firstSeg = readIdent(walker);
    switch (firstSeg) {
        case 'true':
        case 'false':
            return {
                type: 3,
                value: firstSeg === 'true'
            };
    }

    var result = createAccessor([
        {
            type: 1,
            value: firstSeg
        }
    ]);

    /* eslint-disable no-constant-condition */
    accessorLoop: while (1) {
    /* eslint-enable no-constant-condition */

        switch (walker.currentCode()) {
            case 46: // .
                walker.go(1);

                // ident as string
                result.paths.push({
                    type: 1,
                    value: readIdent(walker)
                });
                break;

            case 91: // [
                walker.go(1);
                result.paths.push(readTertiaryExpr(walker));
                walker.goUntil(93); // ]
                break;

            default:
                break accessorLoop;
        }
    }

    return result;
}

// exports = module.exports = readAccessor;


/**
 * @file 读取调用
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readAccessor = require('./read-accessor');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取调用
 *
 * @param {Walker} walker 源码读取对象
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function readCall(walker, defaultArgs) {
    walker.goUntil();
    var result = readAccessor(walker);

    var args;
    if (walker.goUntil(40)) { // (
        args = [];

        while (!walker.goUntil(41)) { // )
            args.push(readTertiaryExpr(walker));
            walker.goUntil(44); // ,
        }
    }
    else if (defaultArgs) {
        args = defaultArgs;
    }

    if (args) {
        result = {
            type: 6,
            name: result,
            args: args
        };
    }

    return result;
}

// exports = module.exports = readCall;


/**
 * @file 读取括号表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 读取括号表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readParenthesizedExpr(walker) {
    walker.go(1);
    var expr = readTertiaryExpr(walker);
    walker.goUntil(41); // )

    expr.parenthesized = true;
    return expr;
}

// exports = module.exports = readParenthesizedExpr;


/**
 * @file 读取乘法表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 读取乘法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readMultiplicativeExpr(walker) {
    var expr = readUnaryExpr(walker);

    while (1) {
        walker.goUntil();

        var code = walker.currentCode();
        switch (code) {
            case 37: // %
            case 42: // *
            case 47: // /
                walker.go(1);
                expr = {
                    type: 8,
                    operator: code,
                    segs: [expr, readUnaryExpr(walker)]
                };
                continue;
        }

        break;
    }


    return expr;
}

// exports = module.exports = readMultiplicativeExpr;


/**
 * @file 读取加法表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readMultiplicativeExpr = require('./read-multiplicative-expr');


/**
 * 读取加法表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readAdditiveExpr(walker) {
    var expr = readMultiplicativeExpr(walker);

    while (1) {
        walker.goUntil();
        var code = walker.currentCode();

        switch (code) {
            case 43: // +
            case 45: // -
                walker.go(1);
                expr = {
                    type: 8,
                    operator: code,
                    segs: [expr, readMultiplicativeExpr(walker)]
                };
                continue;
        }

        break;
    }

    return expr;
}

// exports = module.exports = readAdditiveExpr;


/**
 * @file 读取关系判断表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readAdditiveExpr = require('./read-additive-expr');

/**
 * 读取关系判断表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readRelationalExpr(walker) {
    var expr = readAdditiveExpr(walker);
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 60: // <
        case 62: // >
            if (walker.nextCode() === 61) {
                code += 61;
                walker.go(1);
            }

            return {
                type: 8,
                operator: code,
                segs: [expr, readAdditiveExpr(walker)]
            };
    }

    return expr;
}

// exports = module.exports = readRelationalExpr;


/**
 * @file 读取相等比对表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readRelationalExpr = require('./read-relational-expr');

/**
 * 读取相等比对表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readEqualityExpr(walker) {
    var expr = readRelationalExpr(walker);
    walker.goUntil();

    var code = walker.currentCode();
    switch (code) {
        case 61: // =
        case 33: // !
            if (walker.nextCode() === 61) {
                code += 61;
                if (walker.nextCode() === 61) {
                    code += 61;
                    walker.go(1);
                }

                return {
                    type: 8,
                    operator: code,
                    segs: [expr, readRelationalExpr(walker)]
                };
            }

            walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readEqualityExpr;


/**
 * @file 读取逻辑与表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readEqualityExpr = require('./read-equality-expr');

/**
 * 读取逻辑与表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalANDExpr(walker) {
    var expr = readEqualityExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 38) { // &
        if (walker.nextCode() === 38) {
            walker.go(1);
            return {
                type: 8,
                operator: 76,
                segs: [expr, readLogicalANDExpr(walker)]
            };
        }

        walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readLogicalANDExpr;


/**
 * @file 读取逻辑或表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('./expr-type');
// var readLogicalANDExpr = require('./read-logical-and-expr');

/**
 * 读取逻辑或表达式
 *
 * @param {Walker} walker 源码读取对象
 * @return {Object}
 */
function readLogicalORExpr(walker) {
    var expr = readLogicalANDExpr(walker);
    walker.goUntil();

    if (walker.currentCode() === 124) { // |
        if (walker.nextCode() === 124) {
            walker.go(1);
            return {
                type: 8,
                operator: 248,
                segs: [expr, readLogicalORExpr(walker)]
            };
        }

        walker.go(-1);
    }

    return expr;
}

// exports = module.exports = readLogicalORExpr;


/**
 * @file 解析表达式
 * @author errorrik(errorrik@gmail.com)
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');

/**
 * 解析表达式
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseExpr(source) {
    if (!source) {
        return;
    }

    if (typeof source === 'object' && source.type) {
        return source;
    }

    var expr = readTertiaryExpr(new Walker(source));
    expr.raw = source;
    return expr;
}

// exports = module.exports = parseExpr;


/**
 * @file 解析调用
 * @author errorrik(errorrik@gmail.com)
 */


// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析调用
 *
 * @param {string} source 源码
 * @param {Array=} defaultArgs 默认参数
 * @return {Object}
 */
function parseCall(source, defaultArgs) {
    var expr = readCall(new Walker(source), defaultArgs);

    if (expr.type !== 6) {
        expr = {
            type: 6,
            name: expr,
            args: defaultArgs || []
        };
    }

    expr.raw = source;
    return expr;
}

// exports = module.exports = parseCall;


/**
 * @file 解析插值替换
 * @author errorrik(errorrik@gmail.com)
 */

// var Walker = require('./walker');
// var readTertiaryExpr = require('./read-tertiary-expr');
// var ExprType = require('./expr-type');
// var readCall = require('./read-call');

/**
 * 解析插值替换
 *
 * @param {string} source 源码
 * @return {Object}
 */
function parseInterp(source) {
    var walker = new Walker(source);

    var interp = {
        type: 5,
        expr: readTertiaryExpr(walker),
        filters: [],
        raw: source
    };

    while (walker.goUntil(124)) { // |
        var callExpr = readCall(walker, []);
        switch (callExpr.name.paths[0].value) {
            case 'html':
                break;
            case 'raw':
                interp.original = 1;
                break;
            default:
                interp.filters.push(callExpr);
        }
    }

    return interp;
}

// exports = module.exports = parseInterp;


/**
 * @file 解码 HTML 字符实体
 * @author errorrik(errorrik@gmail.com)
 */

var ENTITY_DECODE_MAP = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    quot: '\"',
    emsp: '\u2003',
    ensp: '\u2002',
    thinsp: '\u2009',
    copy: '\xa9',
    reg: '\xae',
    zwnj: '\u200c',
    zwj: '\u200d',
    amp: '&'
};

/**
 * 解码 HTML 字符实体
 *
 * @param {string} source 要解码的字符串
 * @return {string}
 */
function decodeHTMLEntity(source) {
    return source
        .replace(/&#([0-9]+);/g, function (match, code) {
            return String.fromCharCode(+code);
        })
        .replace(/&#x([0-9a-f]+);/ig, function (match, code) {
            return String.fromCharCode(parseInt(code, 16));
        })
        .replace(/&([a-z]+);/ig, function (match, code) {
            return ENTITY_DECODE_MAP[code] || match;
        });
}

// exports = module.exports = decodeHTMLEntity;


/**
 * @file 解析文本
 * @author errorrik(errorrik@gmail.com)
 */

// var Walker = require('./walker');
// var ExprType = require('./expr-type');
// var parseInterp = require('./parse-interp');
// var decodeHTMLEntity = require('../util/decode-html-entity');

/**
 * 对字符串进行可用于new RegExp的字面化
 *
 * @inner
 * @param {string} source 需要字面化的字符串
 * @return {string} 字符串字面化结果
 */
function regexpLiteral(source) {
    return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+\\]/g, function (c) {
        return '\\' + c;
    });
}

var delimRegCache = {};

/**
 * 解析文本
 *
 * @param {string} source 源码
 * @param {Array?} delimiters 分隔符。默认为 ['{{', '}}']
 * @return {Object}
 */
function parseText(source, delimiters) {
    delimiters = delimiters || ['{{', '}}'];

    var regCacheKey = delimiters[0] + '>..<' + delimiters[1];
    var exprStartReg = delimRegCache[regCacheKey];
    if (!exprStartReg) {
        exprStartReg = new RegExp(
            regexpLiteral(delimiters[0])
                + '\\s*([\\s\\S]+?)\\s*'
                + regexpLiteral(delimiters[1]),
            'ig'
        );
        delimRegCache[regCacheKey] = exprStartReg;
    }

    var exprMatch;

    var walker = new Walker(source);
    var beforeIndex = 0;

    var expr = {
        type: 7,
        segs: []
    };

    function pushStringToSeg(text) {
        text && expr.segs.push({
            type: 1,
            literal: text,
            value: decodeHTMLEntity(text)
        });
    }

    var delimEndLen = delimiters[1].length;
    while ((exprMatch = walker.match(exprStartReg)) != null) {
        var interpSource = exprMatch[1];
        var interpLen = exprMatch[0].length;
        if (walker.cut(walker.index + 1 - delimEndLen, walker.index + 1) === delimiters[1]) {
            interpSource += walker.cut(walker.index, walker.index + 1);
            walker.go(1);
            interpLen++;
        }

        pushStringToSeg(walker.cut(
            beforeIndex,
            walker.index - interpLen
        ));

        var interp = parseInterp(interpSource);
        expr.original = expr.original || interp.original;
        expr.segs.push(interp);

        beforeIndex = walker.index;
    }

    pushStringToSeg(walker.cut(beforeIndex));



    if (expr.segs.length === 1 && expr.segs[0].type === 1) {
        expr.value = expr.segs[0].value;
    }

    return expr;
}

// exports = module.exports = parseText;


/**
 * @file 解析指令
 * @author errorrik(errorrik@gmail.com)
 */


// var Walker = require('./walker');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var readAccessor = require('./read-accessor');
// var readUnaryExpr = require('./read-unary-expr');

/**
 * 指令解析器
 *
 * @inner
 * @type {Object}
 */
var directiveParsers = {
    'for': function (value) {
        var walker = new Walker(value);
        var match = walker.match(/^\s*([\$0-9a-z_]+)(\s*,\s*([\$0-9a-z_]+))?\s+in\s+/ig, 1);

        if (match) {
            var directive = {
                item: parseExpr(match[1]),
                index: parseExpr(match[3] || '$index'),
                value: readUnaryExpr(walker)
            };

            if (walker.match(/\s*trackby\s+/ig, 1)) {
                var start = walker.index;
                directive.trackBy = readAccessor(walker);
                directive.trackBy.raw = walker.cut(start, walker.index);
            }
            return directive;
        }

        // #[begin] error
        throw new Error('[SAN FATAL] for syntax error: ' + value);
        // #[end]
    },

    'ref': function (value, options) {
        return {
            value: parseText(value, options.delimiters)
        };
    },

    'if': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'elif': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'else': function (value) {
        return {
            value: {}
        };
    },

    'bind': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'html': function (value) {
        return {
            value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
    },

    'transition': function (value) {
        return {
            value: parseCall(value)
        };
    }
};

/**
 * 解析指令
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 指令名称
 * @param {string} value 指令值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function parseDirective(aNode, name, value, options) {
    if (name === 'else-if') {
        name = 'elif';
    }

    var parser = directiveParsers[name];
    if (parser) {
        (aNode.directives[name] = parser(value, options)).raw = value;
    }
}

// exports = module.exports = parseDirective;


/**
 * @file 对属性信息进行处理
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');

/**
 * 对属性信息进行处理
 * 对组件的 binds 或者特殊的属性（比如 input 的 checked）需要处理
 *
 * 扁平化：
 * 当 text 解析只有一项时，要么就是 string，要么就是 interp
 * interp 有可能是绑定到组件属性的表达式，不希望被 eval text 成 string
 * 所以这里做个处理，只有一项时直接抽出来
 *
 * bool属性：
 * 当绑定项没有值时，默认为true
 *
 * @param {Object} prop 属性对象
 */
function postProp(prop) {
    var expr = prop.expr;

    if (expr.type === 7) {
        switch (expr.segs.length) {
            case 0:
                prop.expr = {
                    type: 3,
                    value: true
                };
                break;

            case 1:
                expr = prop.expr = expr.segs[0];
                if (expr.type === 5 && expr.filters.length === 0) {
                    prop.expr = expr.expr;
                }
        }
    }
}

// exports = module.exports = postProp;


/**
 * @file 解析抽象节点属性
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var kebab2camel = require('../util/kebab2camel');
// var ExprType = require('./expr-type');
// var createAccessor = require('./create-accessor');
// var parseExpr = require('./parse-expr');
// var parseCall = require('./parse-call');
// var parseText = require('./parse-text');
// var parseDirective = require('./parse-directive');
// var postProp = require('./post-prop');


/**
 * 解析抽象节点属性
 *
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateAttr(aNode, name, value, options) {
    var prefixIndex = name.indexOf('-');
    var realName;
    var prefix;

    if (prefixIndex > 0) {
        prefix = name.slice(0, prefixIndex);
        realName = name.slice(prefixIndex + 1);
    }

    switch (prefix) {
        case 'on':
            var event = {
                name: realName,
                modifier: {}
            };
            aNode.events.push(event);

            var colonIndex;
            while ((colonIndex = value.indexOf(':')) > 0) {
                var modifier = value.slice(0, colonIndex);

                // eventHandler("dd:aa") 这种情况不能算modifier，需要辨识
                if (!/^[a-z]+$/i.test(modifier)) {
                    break;
                }

                event.modifier[modifier] = true;
                value = value.slice(colonIndex + 1);
            }

            event.expr = parseCall(value, [
                createAccessor([
                    {type: 1, value: '$event'}
                ])
            ]);
            break;

        case 'san':
        case 's':
            parseDirective(aNode, realName, value, options);
            break;

        case 'prop':
            integrateProp(aNode, realName, value, options);
            break;

        case 'var':
            if (!aNode.vars) {
                aNode.vars = [];
            }

            realName = kebab2camel(realName);
            aNode.vars.push({
                name: realName,
                expr: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
            });
            break;

        default:
            integrateProp(aNode, name, value, options);
    }
}

/**
 * 解析抽象节点绑定属性
 *
 * @inner
 * @param {ANode} aNode 抽象节点
 * @param {string} name 属性名称
 * @param {string} value 属性值
 * @param {Object} options 解析参数
 * @param {Array?} options.delimiters 插值分隔符列表
 */
function integrateProp(aNode, name, value, options) {
    // parse two way binding, e.g. value="{=ident=}"
    var xMatch = value.match(/^\{=\s*(.*?)\s*=\}$/);

    if (xMatch) {
        aNode.props.push({
            name: name,
            expr: parseExpr(xMatch[1]),
            x: 1,
            raw: value
        });

        return;
    }

    // parse normal prop
    var prop = {
        name: name,
        expr: parseText(value, options.delimiters),
        raw: value
    };

    // 这里不能把只有一个插值的属性抽取
    // 因为插值里的值可能是html片段，容易被注入
    // 组件的数据绑定在组件init时做抽取
    switch (name) {
        case 'class':
        case 'style':
            each(prop.expr.segs, function (seg) {
                if (seg.type === 5) {
                    seg.filters.push({
                        type: 6,
                        name: createAccessor([
                            {
                                type: 1,
                                value: '_' + prop.name
                            }
                        ]),
                        args: []
                    });
                }
            });
            break;

        case 'checked':
            if (aNode.tagName === 'input') {
                postProp(prop);
            }
            break;
    }

    aNode.props.push(prop);
}


// exports = module.exports = integrateAttr;


/**
 * @file 解析模板
 * @author errorrik(errorrik@gmail.com)
 */


// var createANode = require('./create-a-node');
// var Walker = require('./walker');
// var integrateAttr = require('./integrate-attr');
// var parseText = require('./parse-text');
// var svgTags = require('../browser/svg-tags');
// var autoCloseTags = require('../browser/auto-close-tags');

// #[begin] error
function getXPath(stack, currentTagName) {
    var path = ['ROOT'];
    for (var i = 1, len = stack.length; i < len; i++) {
        path.push(stack[i].tagName);
    }
    if (currentTagName) {
        path.push(currentTagName);
    }
    return path.join('>');
}
// #[end]

/* eslint-disable fecs-max-statements */

/**
 * 解析 template
 *
 * @param {string} source template源码
 * @param {Object?} options 解析参数
 * @param {string?} options.trimWhitespace 空白文本的处理策略。none|blank|all
 * @param {Array?} options.delimiters 插值分隔符列表
 * @return {ANode}
 */
function parseTemplate(source, options) {
    options = options || {};
    options.trimWhitespace = options.trimWhitespace || 'none';

    var rootNode = createANode();

    if (typeof source !== 'string') {
        return rootNode;
    }

    source = source.replace(/<!--([\s\S]*?)-->/mg, '').replace(/(^\s+|\s+$)/g, '');
    var walker = new Walker(source);

    var tagReg = /<(\/)?([a-z0-9-]+)\s*/ig;
    var attrReg = /([-:0-9a-z\[\]]+)(\s*=\s*(['"])([^\3]*?)\3)?\s*/ig;

    var tagMatch;
    var currentNode = rootNode;
    var stack = [rootNode];
    var stackIndex = 0;
    var beforeLastIndex = 0;

    while ((tagMatch = walker.match(tagReg)) != null) {
        var tagMatchStart = walker.index - tagMatch[0].length;
        var tagEnd = tagMatch[1];
        var tagName = tagMatch[2];
        if (!svgTags[tagName]) {
            tagName = tagName.toLowerCase();
        }

        // 62: >
        // 47: /
        // 处理 </xxxx >
        if (tagEnd) {
            if (walker.currentCode() === 62) {
                // 满足关闭标签的条件时，关闭标签
                // 向上查找到对应标签，找不到时忽略关闭
                var closeIndex = stackIndex;

                // #[begin] error
                // 如果正在闭合一个自闭合的标签，例如 </input>，报错
                if (autoCloseTags[tagName]) {
                    throw new Error(''
                        + '[SAN ERROR] ' + getXPath(stack, tagName) + ' is a `auto closed` tag, '
                        + 'so it cannot be closed with </' + tagName + '>'
                    );
                }

                // 如果关闭的 tag 和当前打开的不一致，报错
                if (
                    stack[closeIndex].tagName !== tagName
                    // 这里要把 table 自动添加 tbody 的情况给去掉
                    && !(tagName === 'table' && stack[closeIndex].tagName === 'tbody')
                ) {
                    throw new Error('[SAN ERROR] ' + getXPath(stack) + ' is closed with ' + tagName);
                }
                // #[end]


                pushTextNode(source.slice(beforeLastIndex, tagMatchStart));
                while (closeIndex > 0 && stack[closeIndex].tagName !== tagName) {
                    closeIndex--;
                }

                if (closeIndex > 0) {
                    stackIndex = closeIndex - 1;
                    currentNode = stack[stackIndex];
                }
                walker.go(1);
            }
            // #[begin] error
            else {
                // 处理 </xxx 非正常闭合标签

                // 如果闭合标签时，匹配后的下一个字符是 <，即下一个标签的开始，那么当前闭合标签未闭合
                if (walker.currentCode() === 60) {
                    throw new Error(''
                        + '[SAN ERROR] ' + getXPath(stack)
                        + '\'s close tag not closed'
                    );
                }

                // 闭合标签有属性
                throw new Error(''
                    + '[SAN ERROR] ' + getXPath(stack)
                    + '\'s close tag has attributes'
                );
            }
            // #[end]
        }
        else {
            var aElement = createANode({
                tagName: tagName
            });
            var tagClose = autoCloseTags[tagName];

            // 解析 attributes

            /* eslint-disable no-constant-condition */
            while (1) {
            /* eslint-enable no-constant-condition */

                var nextCharCode = walker.currentCode();

                // 标签结束时跳出 attributes 读取
                // 标签可能直接结束或闭合结束
                if (nextCharCode === 62) {
                    walker.go(1);
                    break;
                }

                // 遇到 /> 按闭合处理
                if (nextCharCode === 47
                    && walker.charCode(walker.index + 1) === 62
                ) {
                    walker.go(2);
                    tagClose = 1;
                    break;
                }

                // template 串结束了
                // 这时候，说明这个读取周期的所有内容，都是text
                if (!nextCharCode) {
                    pushTextNode(walker.cut(beforeLastIndex));
                    aElement = null;
                    break;
                }

                // #[begin] error
                // 在处理一个 open 标签时，如果遇到了 <， 即下一个标签的开始，则当前标签未能正常闭合，报错
                if (nextCharCode === 60) {
                    throw new Error('[SAN ERROR] ' + getXPath(stack, tagName) + ' is not closed');
                }
                // #[end]

                // 读取 attribute
                var attrMatch = walker.match(attrReg);
                if (attrMatch) {

                    // #[begin] error
                    // 如果属性有 =，但没取到 value，报错
                    if (
                        walker.charCode(attrMatch.index + attrMatch[1].length) === 61
                        && !attrMatch[2]
                    ) {
                        throw new Error(''
                            + '[SAN ERROR] ' + getXPath(stack, tagName) + ' attribute `'
                            + attrMatch[1] + '` is not wrapped with ""'
                        );
                    }
                    // #[end]

                    integrateAttr(
                        aElement,
                        attrMatch[1],
                        attrMatch[2] ? attrMatch[4] : '',
                        options
                    );
                }

            }

            if (aElement) {
                pushTextNode(source.slice(beforeLastIndex, tagMatchStart));

                // match if directive for else/elif directive
                var elseDirective = aElement.directives['else'] // eslint-disable-line dot-notation
                    || aElement.directives.elif;

                if (elseDirective) {
                    var parentChildrenLen = currentNode.children.length;

                    while (parentChildrenLen--) {
                        var parentChild = currentNode.children[parentChildrenLen];
                        if (parentChild.textExpr) {
                            currentNode.children.splice(parentChildrenLen, 1);
                            continue;
                        }

                        // #[begin] error
                        if (!parentChild.directives['if']) { // eslint-disable-line dot-notation
                            throw new Error('[SAN FATEL] else not match if.');
                        }
                        // #[end]

                        parentChild.elses = parentChild.elses || [];
                        parentChild.elses.push(aElement);

                        break;
                    }
                }
                else {
                    if (aElement.tagName === 'tr' && currentNode.tagName === 'table') {
                        var tbodyNode = createANode({
                            tagName: 'tbody'
                        });
                        currentNode.children.push(tbodyNode);
                        currentNode = tbodyNode;
                        stack[++stackIndex] = tbodyNode;
                    }

                    currentNode.children.push(aElement);
                }

                if (!tagClose) {
                    currentNode = aElement;
                    stack[++stackIndex] = aElement;
                }
            }

        }

        beforeLastIndex = walker.index;
    }

    pushTextNode(walker.cut(beforeLastIndex));

    return rootNode;

    /**
     * 在读取栈中添加文本节点
     *
     * @inner
     * @param {string} text 文本内容
     */
    function pushTextNode(text) {
        switch (options.trimWhitespace) {
            case 'blank':
                if (/^\s+$/.test(text)) {
                    text = null;
                }
                break;

            case 'all':
                text = text.replace(/(^\s+|\s+$)/g, '');
                break;
        }

        if (text) {
            currentNode.children.push(createANode({
                textExpr: parseText(text, options.delimiters)
            }));
        }
    }
}

/* eslint-enable fecs-max-statements */

// exports = module.exports = parseTemplate;


/**
 * @file 默认filter
 * @author errorrik(errorrik@gmail.com)
 */


/* eslint-disable fecs-camelcase */

/**
 * 默认filter
 *
 * @const
 * @type {Object}
 */
var DEFAULT_FILTERS = {

    /**
     * URL编码filter
     *
     * @param {string} source 源串
     * @return {string} 替换结果串
     */
    url: encodeURIComponent,

    _class: function (source) {
        if (source instanceof Array) {
            return source.join(' ');
        }

        return source;
    },

    _style: function (source) {
        if (typeof source === 'object') {
            var result = '';
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    result += key + ':' + source[key] + ';';
                }
            }

            return result;
        }

        return source;
    },

    _sep: function (source, sep) {
        return source ? sep + source : source;
    }
};
/* eslint-enable fecs-camelcase */

// exports = module.exports = DEFAULT_FILTERS;


/**
 * @file 表达式计算
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var extend = require('../util/extend');
// var DEFAULT_FILTERS = require('./default-filters');
// var evalArgs = require('./eval-args');
// var dataCache = require('./data-cache');

/**
 * 计算表达式的值
 *
 * @param {Object} expr 表达式对象
 * @param {Data} data 数据容器对象
 * @param {Component=} owner 所属组件环境
 * @return {*}
 */
function evalExpr(expr, data, owner) {
    if (expr.value != null) {
        return expr.value;
    }

    var value = dataCache.get(data, expr);

    if (value == null) {
        switch (expr.type) {
            case 9:
                value = evalExpr(expr.expr, data, owner);
                switch (expr.operator) {
                    case 33:
                        value = !value;
                        break;

                    case 45:
                        value = 0 - value;
                        break;
                }
                break;

            case 8:
                var leftValue = evalExpr(expr.segs[0], data, owner);
                var rightValue = evalExpr(expr.segs[1], data, owner);

                /* eslint-disable eqeqeq */
                switch (expr.operator) {
                    case 37:
                        value = leftValue % rightValue;
                        break;
                    case 43:
                        value = leftValue + rightValue;
                        break;
                    case 45:
                        value = leftValue - rightValue;
                        break;
                    case 42:
                        value = leftValue * rightValue;
                        break;
                    case 47:
                        value = leftValue / rightValue;
                        break;
                    case 60:
                        value = leftValue < rightValue;
                        break;
                    case 62:
                        value = leftValue > rightValue;
                        break;
                    case 76:
                        value = leftValue && rightValue;
                        break;
                    case 94:
                        value = leftValue != rightValue;
                        break;
                    case 121:
                        value = leftValue <= rightValue;
                        break;
                    case 122:
                        value = leftValue == rightValue;
                        break;
                    case 123:
                        value = leftValue >= rightValue;
                        break;
                    case 155:
                        value = leftValue !== rightValue;
                        break;
                    case 183:
                        value = leftValue === rightValue;
                        break;
                    case 248:
                        value = leftValue || rightValue;
                        break;
                }
                /* eslint-enable eqeqeq */
                break;

            case 10:
                value = evalExpr(
                    expr.segs[evalExpr(expr.segs[0], data, owner) ? 1 : 2],
                    data,
                    owner
                );
                break;

            case 12:
                value = [];
                for (var i = 0, l = expr.items.length; i < l; i++) {
                    var item = expr.items[i];
                    var itemValue = evalExpr(item.expr, data, owner);

                    if (item.spread) {
                        itemValue && (value = value.concat(itemValue));
                    }
                    else {
                        value.push(itemValue);
                    }
                }
                break;

            case 11:
                value = {};
                for (var i = 0, l = expr.items.length; i < l; i++) {
                    var item = expr.items[i];
                    var itemValue = evalExpr(item.expr, data, owner);

                    if (item.spread) {
                        itemValue && extend(value, itemValue);
                    }
                    else {
                        value[evalExpr(item.name, data, owner)] = itemValue;
                    }
                }
                break;

            case 4:
                value = data.get(expr);
                break;

            case 5:
                value = evalExpr(expr.expr, data, owner);

                if (owner) {
                    for (var i = 0, l = expr.filters.length; i < l; i++) {
                        var filter = expr.filters[i];
                        var filterName = filter.name.paths[0].value;

                        if (owner.filters[filterName]) {
                            value = owner.filters[filterName].apply(
                                owner,
                                [value].concat(evalArgs(filter.args, data, owner))
                            );
                        }
                        else if (DEFAULT_FILTERS[filterName]) {
                            value = DEFAULT_FILTERS[filterName](
                                value,
                                filter.args[0] ? filter.args[0].value : ''
                            );
                        }
                    }
                }

                if (value == null) {
                    value = '';
                }

                break;

            case 6:
                if (owner && expr.name.type === 4) {
                    var method = owner;
                    var pathsLen = expr.name.paths.length;

                    for (var i = 0; method && i < pathsLen; i++) {
                        method = method[evalExpr(expr.name.paths[i], data, owner)];
                    }

                    if (method) {
                        value = method.apply(owner, evalArgs(expr.args, data, owner));
                    }
                }

                break;

            /* eslint-disable no-redeclare */
            case 7:
                var buf = '';
                for (var i = 0, l = expr.segs.length; i < l; i++) {
                    var seg = expr.segs[i];
                    buf += seg.value || evalExpr(seg, data, owner);
                }
                return buf;
        }

        dataCache.set(data, expr, value);
    }

    return value;
}

// exports = module.exports = evalExpr;


/**
 * @file 为函数调用计算参数数组的值
 * @author errorrik(errorrik@gmail.com)
 */


// var evalExpr = require('./eval-expr');

/**
 * 为函数调用计算参数数组的值
 *
 * @param {Array} args 参数表达式列表
 * @param {Data} data 数据环境
 * @param {Component} owner 组件环境
 * @return {Array}
 */
function evalArgs(args, data, owner) {
    var result = [];
    for (var i = 0; i < args.length; i++) {
        result.push(evalExpr(args[i], data, owner));
    }

    return result;
}

// exports = module.exports = evalArgs;


/**
 * @file 数据缓存管理器
 * @author errorrik(errorrik@gmail.com)
 */



var dataCacheSource = {};
var dataCacheClearly = 1;

/**
 * 数据缓存管理器
 *
 * @const
 * @type {Object}
 */
var dataCache = {
    clear: function () {
        if (!dataCacheClearly) {
            dataCacheClearly = 1;
            dataCacheSource = {};
        }
    },

    set: function (data, expr, value) {
        if (expr.raw) {
            dataCacheClearly = 0;
            (dataCacheSource[data.id] = dataCacheSource[data.id] || {})[expr.raw] = value;
        }
    },

    get: function (data, expr) {
        if (expr.raw && dataCacheSource[data.id]) {
            return dataCacheSource[data.id][expr.raw];
        }
    }
};


// exports = module.exports = dataCache;


/**
 * @file 比较变更表达式与目标表达式之间的关系
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var each = require('../util/each');

/**
 * 判断变更表达式与多个表达式之间的关系，0为完全没关系，1为有关系
 *
 * @inner
 * @param {Object} changeExpr 目标表达式
 * @param {Array} exprs 多个源表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompareExprs(changeExpr, exprs, data) {
    for (var i = 0, l = exprs.length; i < l; i++) {
        if (changeExprCompare(changeExpr, exprs[i], data)) {
            return 1;
        }
    }

    return 0;
}

/**
 * 比较变更表达式与目标表达式之间的关系，用于视图更新判断
 * 视图更新需要根据其关系，做出相应的更新行为
 *
 * 0: 完全没关系
 * 1: 变更表达式是目标表达式的母项(如a与a.b) 或 表示需要完全变化
 * 2: 变更表达式是目标表达式相等
 * >2: 变更表达式是目标表达式的子项，如a.b.c与a.b
 *
 * @param {Object} changeExpr 变更表达式
 * @param {Object} expr 要比较的目标表达式
 * @param {Data} data 表达式所属数据环境
 * @return {number}
 */
function changeExprCompare(changeExpr, expr, data) {
    switch (expr.type) {
        case 4:
            var paths = expr.paths;
            var pathsLen = paths.length;
            var changePaths = changeExpr.paths;
            var changeLen = changePaths.length;

            var result = 1;
            for (var i = 0; i < pathsLen; i++) {
                var pathExpr = paths[i];
                var pathExprValue = pathExpr.value;

                if (pathExprValue == null && changeExprCompare(changeExpr, pathExpr, data)) {
                    return 1;
                }

                if (result && i < changeLen
                    /* eslint-disable eqeqeq */
                    && (pathExprValue || evalExpr(pathExpr, data))
                        != (changePaths[i].value || evalExpr(changePaths[i], data))
                    /* eslint-enable eqeqeq */
                ) {
                    result = 0;
                }
            }

            if (result) {
                result = Math.max(1, changeLen - pathsLen + 2);
            }
            return result;

        case 9:
            return changeExprCompare(changeExpr, expr.expr, data) ? 1 : 0;


        case 7:
        case 8:
        case 10:
            return changeExprCompareExprs(changeExpr, expr.segs, data);

        case 12:
        case 11:
            for (var i = 0, l = expr.items.length; i < l; i++) {
                if (changeExprCompare(changeExpr, expr.items[i].expr, data)) {
                    return 1;
                }
            }

            return 0;

        case 5:
            if (!changeExprCompare(changeExpr, expr.expr, data)) {
                var filterResult;
                each(expr.filters, function (filter) {
                    filterResult = changeExprCompareExprs(changeExpr, filter.args, data);
                    return !filterResult;
                });

                return filterResult ? 1 : 0;
            }

            return 1;

        case 6:
            if (changeExprCompareExprs(changeExpr, expr.name.paths, data)
                || changeExprCompareExprs(changeExpr, expr.args, data)
            ) {
                return 1;
            }
    }

    return 0;
}

// exports = module.exports = changeExprCompare;


/**
 * @file 数据变更类型枚举
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 数据变更类型枚举
 *
 * @const
 * @type {Object}
 */
var DataChangeType = {
    SET: 1,
    SPLICE: 2
};

// exports = module.exports = DataChangeType;


/**
 * @file 生命周期类
 * @author errorrik(errorrik@gmail.com)
 */

function lifeCycleOwnIs(name) {
    return this[name];
}

/* eslint-disable fecs-valid-var-jsdoc */
/**
 * 节点生命周期信息
 *
 * @inner
 * @type {Object}
 */
var LifeCycle = {
    start: {},

    compiled: {
        is: lifeCycleOwnIs,
        compiled: true
    },

    inited: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true
    },

    created: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true
    },

    attached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true
    },

    leaving: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true,
        leaving: true
    },

    detached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        detached: true
    },

    disposed: {
        is: lifeCycleOwnIs,
        disposed: true
    }
};
/* eslint-enable fecs-valid-var-jsdoc */


// exports = module.exports = LifeCycle;


/**
 * @file 节点类型
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 节点类型
 *
 * @const
 * @type {Object}
 */
var NodeType = {
    TEXT: 1,
    IF: 2,
    FOR: 3,
    ELEM: 4,
    CMPT: 5,
    SLOT: 6,
    TPL: 7
};

// exports = module.exports = NodeType;


/**
 * @file 获取 ANode props 数组中相应 name 的项
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 获取 ANode props 数组中相应 name 的项
 *
 * @param {Object} aNode ANode对象
 * @param {string} name name属性匹配串
 * @return {Object}
 */
function getANodeProp(aNode, name) {
    var index = aNode.hotspot.props[name];
    if (index != null) {
        return aNode.props[index];
    }
}

// exports = module.exports = getANodeProp;


/**
 * @file 获取属性处理对象
 * @author errorrik(errorrik@gmail.com)
 */

// var contains = require('../util/contains');
// var empty = require('../util/empty');
// var svgTags = require('../browser/svg-tags');
// var evalExpr = require('../runtime/eval-expr');
// var getANodeProp = require('./get-a-node-prop');
// var NodeType = require('./node-type');


/**
 * HTML 属性和 DOM 操作属性的对照表
 *
 * @inner
 * @const
 * @type {Object}
 */
var HTML_ATTR_PROP_MAP = {
    'readonly': 'readOnly',
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'colspan': 'colSpan',
    'rowspan': 'rowSpan',
    'valign': 'vAlign',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'for': 'htmlFor'
};

/**
 * 默认的元素的属性设置的变换方法
 *
 * @inner
 * @type {Object}
 */
var defaultElementPropHandler = {
    prop: function (el, value, name, element) {
        var propName = HTML_ATTR_PROP_MAP[name] || name;
        value = value == null ? '' : value;
        // input 的 type 是个特殊属性，其实也应该用 setAttribute
        // 但是 type 不应该运行时动态改变，否则会有兼容性问题
        // 所以这里直接就不管了
        if (propName in el) {
            el[propName] = value;
        }
        else {
            el.setAttribute(name, value);
        }

        // attribute 绑定的是 text，所以不会出现 null 的情况，这里无需处理
        // 换句话来说，san 是做不到 attribute 时有时无的
        // if (value == null) {
        //     el.removeAttribute(name);
        // }
    },

    output: function (element, bindInfo, data) {
        data.set(bindInfo.expr, element.el[bindInfo.name], {
            target: {
                id: element.id,
                prop: bindInfo.name
            }
        });
    }
};

var svgPropHandler = {
    prop: function (el, value, name) {
        el.setAttribute(name, value);
    }
};

var boolPropHandler = {
    prop: function (el, value, name, element, prop) {
        var propName = HTML_ATTR_PROP_MAP[name] || name;
        el[propName] = !!(prop && prop.raw === ''
            || value && value !== 'false' && value !== '0');
    }
};

/* eslint-disable fecs-properties-quote */
/**
 * 默认的属性设置变换方法
 *
 * @inner
 * @type {Object}
 */
var defaultElementPropHandlers = {
    style: {
        prop: function (el, value) {
            el.style.cssText = value;
        }
    },

    'class': { // eslint-disable-line
        prop: function (el, value) {
            el.className = value;
        }
    },

    slot: {
        prop: empty
    },

    draggable: boolPropHandler
};
/* eslint-enable fecs-properties-quote */

var analInputChecker = {
    checkbox: contains,
    radio: function (a, b) {
        return a === b;
    }
};

function analInputCheckedState(element, value) {
    var bindValue = getANodeProp(element.aNode, 'value');
    var bindType = getANodeProp(element.aNode, 'type');

    if (bindValue && bindType) {
        var type = evalExpr(bindType.expr, element.scope, element.owner);

        if (analInputChecker[type]) {
            var bindChecked = getANodeProp(element.aNode, 'checked');
            if (bindChecked != null && !bindChecked.hintExpr) {
                bindChecked.hintExpr = bindValue.expr;
            }

            return !!analInputChecker[type](
                value,
                evalExpr(bindValue.expr, element.scope, element.owner)
            );
        }
    }
}

var elementPropHandlers = {
    input: {
        multiple: boolPropHandler,
        checked: {
            prop: function (el, value, name, element) {
                var state = analInputCheckedState(element, value);

                boolPropHandler.prop(
                    el,
                    state != null ? state : value,
                    'checked',
                    element
                );
            },

            output: function (element, bindInfo, data) {
                var el = element.el;
                var bindValue = getANodeProp(element.aNode, 'value');
                var bindType = getANodeProp(element.aNode, 'type') || {};

                if (bindValue && bindType) {
                    switch (el.type.toLowerCase()) {
                        case 'checkbox':
                            data[el.checked ? 'push' : 'remove'](bindInfo.expr, el.value);
                            return;

                        case 'radio':
                            el.checked && data.set(bindInfo.expr, el.value, {
                                target: {
                                    id: element.id,
                                    prop: bindInfo.name
                                }
                            });
                            return;
                    }
                }

                defaultElementPropHandler.output(element, bindInfo, data);
            }
        },
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    option: {
        value: {
            prop: function (el, value, name, element) {
                defaultElementPropHandler.prop(el, value, name, element);

                if (isOptionSelected(element, value)) {
                    el.selected = true;
                }
            }
        }
    },

    select: {
        value: {
            prop: function (el, value) {
                el.value = value || '';
            },

            output: defaultElementPropHandler.output
        },
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    textarea: {
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
    },

    button: {
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        type: {
            prop: function (el, value) {
                el.setAttribute('type', value || '');
            }
        }
    }
};

function isOptionSelected(element, value) {
    var parentSelect = element.parent;
    while (parentSelect) {
        if (parentSelect.tagName === 'select') {
            break;
        }

        parentSelect = parentSelect.parent;
    }


    if (parentSelect) {
        var selectValue = null;
        var prop;
        var expr;

        if ((prop = getANodeProp(parentSelect.aNode, 'value'))
            && (expr = prop.expr)
        ) {
            selectValue = parentSelect.nodeType === 5
                ? evalExpr(expr, parentSelect.data, parentSelect)
                : evalExpr(expr, parentSelect.scope, parentSelect.owner)
                || '';
        }

        if (selectValue === value) {
            return 1;
        }
    }
}


/**
 * 获取属性处理对象
 *
 * @param {string} tagName 元素tag
 * @param {string} attrName 属性名
 * @return {Object}
 */
function getPropHandler(tagName, attrName) {
    if (svgTags[tagName]) {
        return svgPropHandler;
    }

    var tagPropHandlers = elementPropHandlers[tagName];
    if (!tagPropHandlers) {
        tagPropHandlers = elementPropHandlers[tagName] = {};
    }

    var propHandler = tagPropHandlers[attrName];
    if (!propHandler) {
        propHandler = defaultElementPropHandlers[attrName] || defaultElementPropHandler;
        tagPropHandlers[attrName] = propHandler;
    }

    return propHandler;
}

// exports = module.exports = getPropHandler;


/**
 * @file 判断变更是否来源于元素
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 判断变更是否来源于元素，来源于元素时，视图更新需要阻断
 *
 * @param {Object} change 变更对象
 * @param {Element} element 元素
 * @param {string?} propName 属性名，可选。需要精确判断是否来源于此属性时传入
 * @return {boolean}
 */
function isDataChangeByElement(change, element, propName) {
    var changeTarget = change.option.target;
    return changeTarget && changeTarget.id === element.id
        && (!propName || changeTarget.prop === propName);
}

// exports = module.exports = isDataChangeByElement;


/**
 * @file 在对象上使用accessor表达式查找方法
 * @author errorrik(errorrik@gmail.com)
 */

// var evalExpr = require('../runtime/eval-expr');

/**
 * 在对象上使用accessor表达式查找方法
 *
 * @param {Object} source 源对象
 * @param {Object} nameExpr 表达式
 * @param {Data} data 所属数据环境
 * @return {Function}
 */
function findMethod(source, nameExpr, data) {
    var method = source;

    for (var i = 0; method != null && i < nameExpr.paths.length; i++) {
        method = method[evalExpr(nameExpr.paths[i], data)];
    }

    return method;
}

// exports = module.exports = findMethod;


/**
 * @file 数据类
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var evalExpr = require('./eval-expr');
// var DataChangeType = require('./data-change-type');
// var createAccessor = require('../parser/create-accessor');
// var parseExpr = require('../parser/parse-expr');
// var guid = require('../util/guid');
// var dataCache = require('./data-cache');

/**
 * 数据类
 *
 * @class
 * @param {Object?} data 初始数据
 * @param {Model?} parent 父级数据容器
 */
function Data(data, parent) {
    this.id = guid();
    this.parent = parent;
    this.raw = data || {};
    this.listeners = [];
}

// #[begin] error
// 以下两个函数只在开发模式下可用，在生产模式下不存在
/**
 * DataTypes 检测
 */
Data.prototype.checkDataTypes = function () {
    if (this.typeChecker) {
        this.typeChecker(this.raw);
    }
};

/**
 * 设置 type checker
 *
 * @param  {Function} typeChecker 类型校验器
 */
Data.prototype.setTypeChecker = function (typeChecker) {
    this.typeChecker = typeChecker;
};

// #[end]

/**
 * 添加数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.listen = function (listener) {
    if (typeof listener === 'function') {
        this.listeners.push(listener);
    }
};

/**
 * 移除数据变更的事件监听器
 *
 * @param {Function} listener 监听函数
 */
Data.prototype.unlisten = function (listener) {
    var len = this.listeners.length;
    while (len--) {
        if (!listener || this.listeners[len] === listener) {
            this.listeners.splice(len, 1);
        }
    }
};

/**
 * 触发数据变更
 *
 * @param {Object} change 变更信息对象
 */
Data.prototype.fire = function (change) {
    if (change.option.silent || change.option.silence || change.option.quiet) {
        return;
    }

    for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i].call(this, change);
    }
};

/**
 * 获取数据项
 *
 * @param {string|Object?} expr 数据项路径
 * @param {Data?} callee 当前数据获取的调用环境
 * @return {*}
 */
Data.prototype.get = function (expr, callee) {
    var value = this.raw;
    if (!expr) {
        return value;
    }

    expr = parseExpr(expr);

    var paths = expr.paths;
    callee = callee || this;

    value = value[paths[0].value];

    if (value == null && this.parent) {
        value = this.parent.get(expr, callee);
    }
    else {
        for (var i = 1, l = paths.length; value != null && i < l; i++) {
            value = value[paths[i].value || evalExpr(paths[i], callee)];
        }
    }

    return value;
};


/**
 * 数据对象变更操作
 *
 * @inner
 * @param {Object|Array} source 要变更的源数据
 * @param {Array} exprPaths 属性路径
 * @param {*} value 变更属性值
 * @param {Data} data 对应的Data对象
 * @return {*} 变更后的新数据
 */
function immutableSet(source, exprPaths, value, data) {
    if (exprPaths.length === 0) {
        return value;
    }

    if (source == null) {
        source = {};
    }

    var prop = evalExpr(exprPaths[0], data);
    var result = source;

    if (source instanceof Array) {
        var index = +prop;

        result = source.slice(0);
        result[isNaN(index) ? prop : index] = immutableSet(source[index], exprPaths.slice(1), value, data);
    }
    else if (typeof source === 'object') {
        result = {};

        for (var key in source) {
            if (key !== prop) {
                result[key] = source[key];
            }
        }

        result[prop] = immutableSet(source[prop], exprPaths.slice(1), value, data);
    }

    return result;
}

/**
 * 设置数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.set = function (expr, value, option) {
    option = option || {};

    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data set: ' + exprRaw);
    }
    // #[end]

    if (this.get(expr) === value && !option.force) {
        return;
    }

    dataCache.clear();
    this.raw = immutableSet(this.raw, expr.paths, value, this);
    this.fire({
        type: 1,
        expr: expr,
        value: value,
        option: option
    });

    // #[begin] error
    this.checkDataTypes();
    // #[end]

};

/**
 * 合并更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object} source 待合并的数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.merge = function (expr, source, option) {
    option = option || {};

    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data merge: ' + exprRaw);
    }

    if (typeof this.get(expr) !== 'object') {
        throw new Error('[SAN ERROR] Merge Expects a Target of Type \'object\'; got ' + typeof oldValue);
    }

    if (typeof source !== 'object') {
        throw new Error('[SAN ERROR] Merge Expects a Source of Type \'object\'; got ' + typeof source);
    }
    // #[end]

    for (var key in source) { // eslint-disable-line
        this.set(
            createAccessor(
                expr.paths.concat(
                    [
                        {
                            type: 1,
                            value: key
                        }
                    ]
                )
            ),
            source[key],
            option
        );
    }
};

/**
 * 基于更新函数更新数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {Function} fn 数据处理函数
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.apply = function (expr, fn, option) {
    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data apply: ' + exprRaw);
    }
    // #[end]

    var oldValue = this.get(expr);

    // #[begin] error
    if (typeof fn !== 'function') {
        throw new Error(
            '[SAN ERROR] Invalid Argument\'s Type in Data apply: '
            + 'Expected Function but got ' + typeof fn
        );
    }
    // #[end]

    this.set(expr, fn(oldValue), option);
};

/**
 * 数组数据项splice操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Array} args splice 接受的参数列表，数组项与Array.prototype.splice的参数一致
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {Array} 新数组
 */
Data.prototype.splice = function (expr, args, option) {
    option = option || {};
    // #[begin] error
    var exprRaw = expr;
    // #[end]

    expr = parseExpr(expr);

    // #[begin] error
    if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data splice: ' + exprRaw);
    }
    // #[end]

    var target = this.get(expr);
    var returnValue = [];

    if (target instanceof Array) {
        var index = args[0];
        var len = target.length;
        if (index > len) {
            index = len;
        }
        else if (index < 0) {
            index = len + index;
            if (index < 0) {
                index = 0;
            }
        }

        var newArray = target.slice(0);
        returnValue = newArray.splice.apply(newArray, args);
        dataCache.clear();
        this.raw = immutableSet(this.raw, expr.paths, newArray, this);

        this.fire({
            expr: expr,
            type: 2,
            index: index,
            deleteCount: returnValue.length,
            value: returnValue,
            insertions: args.slice(2),
            option: option
        });
    }

    // #[begin] error
    this.checkDataTypes();
    // #[end]

    return returnValue;
};

/**
 * 数组数据项push操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要push的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.push = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [target.length, 0, item], option);
        return target.length + 1;
    }
};

/**
 * 数组数据项pop操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.pop = function (expr, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        var len = target.length;
        if (len) {
            return this.splice(expr, [len - 1, 1], option)[0];
        }
    }
};

/**
 * 数组数据项shift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {*}
 */
Data.prototype.shift = function (expr, option) {
    return this.splice(expr, [0, 1], option)[0];
};

/**
 * 数组数据项unshift操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} item 要unshift的值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 * @return {number} 新数组的length属性
 */
Data.prototype.unshift = function (expr, item, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        this.splice(expr, [0, 0, item], option);
        return target.length + 1;
    }
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {number} index 要移除项的索引
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.removeAt = function (expr, index, option) {
    this.splice(expr, [index, 1], option);
};

/**
 * 数组数据项移除操作
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 要移除的项
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.remove = function (expr, value, option) {
    var target = this.get(expr);

    if (target instanceof Array) {
        var len = target.length;
        while (len--) {
            if (target[len] === value) {
                this.splice(expr, [len, 1], option);
                break;
            }
        }
    }
};

// exports = module.exports = Data;


/**
 * @file 声明式事件的监听函数
 * @author errorrik(errorrik@gmail.com)
 */


// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var Data = require('../runtime/data');

/**
 * 声明式事件的监听函数
 *
 * @param {Object} eventBind 绑定信息对象
 * @param {boolean} isComponentEvent 是否组件自定义事件
 * @param {Data} data 数据环境
 * @param {Event} e 事件对象
 */
function eventDeclarationListener(eventBind, isComponentEvent, data, e) {
    var method = findMethod(this, eventBind.expr.name, data);

    if (typeof method === 'function') {
        var scope = new Data(
            {$event: isComponentEvent ? e : e || window.event},
            data
        );
        method.apply(this, evalArgs(eventBind.expr.args, scope, this));
    }
}

// exports = module.exports = eventDeclarationListener;


/**
 * @file 是否浏览器环境
 * @author errorrik(errorrik@gmail.com)
 */

var isBrowser = typeof window !== 'undefined';

// exports = module.exports = isBrowser;


/**
 * @file insertBefore 方法的兼容性封装
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * insertBefore 方法的兼容性封装
 *
 * @param {HTMLNode} targetEl 要插入的节点
 * @param {HTMLElement} parentEl 父元素
 * @param {HTMLElement?} beforeEl 在此元素之前插入
 */
function insertBefore(targetEl, parentEl, beforeEl) {
    if (parentEl) {
        if (beforeEl) {
            parentEl.insertBefore(targetEl, beforeEl);
        }
        else {
            parentEl.appendChild(targetEl);
        }
    }
}

// exports = module.exports = insertBefore;


/**
 * @file 判断元素是否不允许设置HTML
 * @author errorrik(errorrik@gmail.com)
 */

// some html elements cannot set innerHTML in old ie
// see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx

/**
 * 判断元素是否不允许设置HTML
 *
 * @param {HTMLElement} el 要判断的元素
 * @return {boolean}
 */
function noSetHTML(el) {
    return /^(col|colgroup|frameset|style|table|tbody|tfoot|thead|tr|select)$/i.test(el.tagName);
}

// exports = module.exports = noSetHTML;


/**
 * @file  获取节点 stump 的 comment
 * @author errorrik(errorrik@gmail.com)
 */

// var noSetHTML = require('../browser/no-set-html');

// #[begin] error
/**
 * 获取节点 stump 的 comment
 *
 * @param {HTMLElement} el HTML元素
 */
function warnSetHTML(el) {
    // dont warn if not in browser runtime
    if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)) {
        return;
    }

    // some html elements cannot set innerHTML in old ie
    // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
    if (noSetHTML(el)) {
        var message = '[SAN WARNING] set html for element "' + el.tagName
            + '" may cause an error in old IE';
        /* eslint-disable no-console */
        if (typeof console === 'object' && console.warn) {
            console.warn(message);
        }
        else {
            throw new Error(message);
        }
        /* eslint-enable no-console */
    }
}
// #[end]

// exports = module.exports = warnSetHTML;


/**
 * @file 判断是否结束桩
 * @author errorrik(errorrik@gmail.com)
 */

// #[begin] reverse
/**
 * 判断是否结束桩
 *
 * @param {HTMLElement|HTMLComment} target 要判断的元素
 * @param {string} type 桩类型
 * @return {boolean}
 */
function isEndStump(target, type) {
    return target.nodeType === 8 && target.data === '/s-' + type;
}
// #[end]

// exports = module.exports = isEndStump;


/**
 * @file 获取节点在组件树中的路径
 * @author errorrik(errorrik@gmail.com)
 */


// var NodeType = require('./node-type');

// #[begin] reverse
/**
 * 获取节点在组件树中的路径
 *
 * @param {Node} node 节点对象
 * @return {Array}
 */
function getNodePath(node) {
    var nodePaths = [];
    var nodeParent = node;
    while (nodeParent) {
        switch (nodeParent.nodeType) {
            case 4:
                nodePaths.unshift(nodeParent.tagName);
                break;

            case 2:
                nodePaths.unshift('if');
                break;

            case 3:
                nodePaths.unshift('for[' + nodeParent.anode.directives['for'].raw + ']'); // eslint-disable-line dot-notation
                break;

            case 6:
                nodePaths.unshift('slot[' + (nodeParent.name || 'default') + ']');
                break;

            case 7:
                nodePaths.unshift('template');
                break;

            case 5:
                nodePaths.unshift('component[' + (nodeParent.subTag || 'root') + ']');
                break;

            case 1:
                nodePaths.unshift('text');
                break;
        }

        nodeParent = nodeParent.parent;
    }

    return nodePaths;
}
// #[end]

// exports = module.exports = getNodePath;


/**
 * @file text 节点类
 * @author errorrik(errorrik@gmail.com)
 */

// var isBrowser = require('../browser/is-browser');
// var removeEl = require('../browser/remove-el');
// var insertBefore = require('../browser/insert-before');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var warnSetHTML = require('./warn-set-html');
// var isEndStump = require('./is-end-stump');
// var getNodePath = require('./get-node-path');


/**
 * text 节点类
 *
 * @param {Object} aNode 抽象节点
 * @param {Component} owner 所属组件环境
 * @param {Model=} scope 所属数据环境
 * @param {Node} parent 父亲节点
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TextNode(aNode, owner, scope, parent, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;

    // #[begin] reverse
    if (reverseWalker) {
        var currentNode = reverseWalker.current;
        if (currentNode) {
            switch (currentNode.nodeType) {
                case 8:
                    if (currentNode.data === 's-text') {
                        this.sel = currentNode;
                        currentNode.data = this.id;
                        reverseWalker.goNext();

                        while (1) { // eslint-disable-line
                            currentNode = reverseWalker.current;
                            if (!currentNode) {
                                throw new Error('[SAN REVERSE ERROR] Text end flag not found. \nPaths: '
                                    + getNodePath(this).join(' > '));
                            }

                            if (isEndStump(currentNode, 'text')) {
                                this.el = currentNode;
                                reverseWalker.goNext();
                                currentNode.data = this.id;
                                break;
                            }

                            reverseWalker.goNext();
                        }
                    }
                    break;

                case 3:
                    reverseWalker.goNext();
                    if (!this.aNode.textExpr.original) {
                        this.el = currentNode;
                    }
                    break;
            }
        }
        else {
            this.el = document.createTextNode('');
            insertBefore(this.el, reverseWalker.target, reverseWalker.current);
        }
    }
    // #[end]
}

TextNode.prototype.nodeType = 1;

/**
 * 将text attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
TextNode.prototype.attach = function (parentEl, beforeEl) {
    this.content = evalExpr(this.aNode.textExpr, this.scope, this.owner);

    if (this.aNode.textExpr.original) {
        this.sel = document.createComment(this.id);
        insertBefore(this.sel, parentEl, beforeEl);

        this.el = document.createComment(this.id);
        insertBefore(this.el, parentEl, beforeEl);

        var tempFlag = document.createElement('script');
        parentEl.insertBefore(tempFlag, this.el);
        tempFlag.insertAdjacentHTML('beforebegin', this.content);
        parentEl.removeChild(tempFlag);
    }
    else {
        this.el = document.createTextNode(this.content);
        insertBefore(this.el, parentEl, beforeEl);
    }
};

/**
 * 销毁 text 节点
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
TextNode.prototype.dispose = function (noDetach) {
    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }

    this.el = null;
    this.sel = null;
};

var textUpdateProp = isBrowser
    && (typeof document.createTextNode('').textContent === 'string'
        ? 'textContent'
        : 'data');

/**
 * 更新 text 节点的视图
 *
 * @param {Array} changes 数据变化信息
 */
TextNode.prototype._update = function (changes) {
    if (this.aNode.textExpr.value) {
        return;
    }

    var len = changes ? changes.length : 0;
    while (len--) {
        if (changeExprCompare(changes[len].expr, this.aNode.textExpr, this.scope)) {
            var text = evalExpr(this.aNode.textExpr, this.scope, this.owner);

            if (text !== this.content) {
                this.content = text;

                if (this.aNode.textExpr.original) {
                    var startRemoveEl = this.sel.nextSibling;
                    var parentEl = this.el.parentNode;

                    while (startRemoveEl !== this.el) {
                        var removeTarget = startRemoveEl;
                        startRemoveEl = startRemoveEl.nextSibling;
                        removeEl(removeTarget);
                    }

                    // #[begin] error
                    warnSetHTML(parentEl);
                    // #[end]

                    var tempFlag = document.createElement('script');
                    parentEl.insertBefore(tempFlag, this.el);
                    tempFlag.insertAdjacentHTML('beforebegin', text);
                    parentEl.removeChild(tempFlag);
                }
                else {
                    this.el[textUpdateProp] = text;
                }
            }

            return;
        }
    }
};

// exports = module.exports = TextNode;


/**
 * @file 判断变更数组是否影响到数据引用摘要
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 判断变更数组是否影响到数据引用摘要
 *
 * @param {Array} changes 变更数组
 * @param {Object} dataRef 数据引用摘要
 * @return {boolean}
 */
function changesIsInDataRef(changes, dataRef) {
    for (var i = 0; i < changes.length; i++) {
        var change = changes[i];

        if (!change.overview) {
            var paths = change.expr.paths;
            change.overview = paths[0].value;

            if (paths.length > 1) {
                change.extOverview = paths[0].value + '.' + paths[1].value;
                change.wildOverview = paths[0].value + '.*';
            }
        }

        if (dataRef[change.overview]
            || change.wildOverview && dataRef[change.wildOverview]
            || change.extOverview && dataRef[change.extOverview]
        ) {
            return true;
        }
    }
}

// exports = module.exports = changesIsInDataRef;


/**
 * @file 元素子节点遍历操作类
 * @author errorrik(errorrik@gmail.com)
 */

// var removeEl = require('../browser/remove-el');

// #[begin] reverse
/**
 * 元素子节点遍历操作类
 *
 * @inner
 * @class
 * @param {HTMLElement} el 要遍历的元素
 */
function DOMChildrenWalker(el) {
    this.raw = [];
    this.index = 0;
    this.target = el;

    var child = el.firstChild;
    var next;
    while (child) {
        next = child.nextSibling;

        switch (child.nodeType) {
            case 3:
                if (/^\s*$/.test(child.data || child.textContent)) {
                    removeEl(child);
                }
                else {
                    this.raw.push(child);
                }
                break;

            case 1:
            case 8:
                this.raw.push(child);
        }

        child = next;
    }

    this.current = this.raw[this.index];
    this.next = this.raw[this.index + 1];
}

/**
 * 往下走一个元素
 */
DOMChildrenWalker.prototype.goNext = function () {
    this.current = this.raw[++this.index];
    this.next = this.raw[this.index + 1];
};
// #[end]

// exports = module.exports = DOMChildrenWalker;


/**
 * @file 元素节点类
 * @author errorrik(errorrik@gmail.com)
 */


// var guid = require('../util/guid');
// var removeEl = require('../browser/remove-el');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var evalExpr = require('../runtime/eval-expr');
// var LifeCycle = require('./life-cycle');
// var NodeType = require('./node-type');
// var reverseElementChildren = require('./reverse-element-children');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var getPropHandler = require('./get-prop-handler');
// var elementUpdateChildren = require('./element-update-children');
// var elementOwnCreate = require('./element-own-create');
// var elementOwnAttach = require('./element-own-attach');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnToPhase = require('./element-own-to-phase');
// var elementOwnAttached = require('./element-own-attached');
// var elementDispose = require('./element-dispose');
// var elementInitTagName = require('./element-init-tag-name');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var handleProp = require('./handle-prop');
// var warnSetHTML = require('./warn-set-html');
// var getNodePath = require('./get-node-path');

/**
 * 元素节点类
 *
 * @param {Object} aNode 抽象节点
 * @param {Component} owner 所属组件环境
 * @param {Model=} scope 所属数据环境
 * @param {Node} parent 父亲节点
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function Element(aNode, owner, scope, parent, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;

    this.lifeCycle = LifeCycle.start;
    this.children = [];
    this._elFns = [];
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid();

    elementInitTagName(this);

    nodeSBindInit(this, aNode.directives.bind);

    this._toPhase('inited');

    // #[begin] reverse
    if (reverseWalker) {
        var currentNode = reverseWalker.current;

        if (!currentNode) {
            throw new Error('[SAN REVERSE ERROR] Element not found. \nPaths: '
                + getNodePath(this).join(' > '));
        }

        if (currentNode.nodeType !== 1) {
            throw new Error('[SAN REVERSE ERROR] Element type not match, expect 1 but '
                + currentNode.nodeType + '.\nPaths: '
                + getNodePath(this).join(' > '));
        }

        if (currentNode.tagName.toLowerCase() !== this.tagName) {
            throw new Error('[SAN REVERSE ERROR] Element tagName not match, expect '
                + this.tagName + ' but meat ' + currentNode.tagName.toLowerCase() + '.\nPaths: '
                + getNodePath(this).join(' > '));
        }

        this.el = currentNode;
        reverseWalker.goNext();

        reverseElementChildren(this);

        this._attached();
    }
    // #[end]
}



Element.prototype.nodeType = 4;


Element.prototype.attach = elementOwnAttach;
Element.prototype.detach = elementOwnDetach;
Element.prototype.dispose = elementOwnDispose;
Element.prototype._create = elementOwnCreate;
Element.prototype._toPhase = elementOwnToPhase;
Element.prototype._onEl = elementOwnOnEl;

Element.prototype._doneLeave = function () {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            elementDispose(
                this,
                this.disposeNoDetach,
                this.disposeNoTransition
            );
        }
    }
    else if (this.lifeCycle.attached) {
        removeEl(this.el);
        this._toPhase('detached');
    }
};

/**
 * 视图更新
 *
 * @param {Array} changes 数据变化信息
 */
Element.prototype._update = function (changes) {
    if (!changesIsInDataRef(changes, this.aNode.hotspot.data)) {
        return;
    }

    // update s-bind
    var me = this;
    nodeSBindUpdate(
        this,
        this.aNode.directives.bind,
        changes,
        function (name, value) {
            if (name in me.aNode.hotspot.props) {
                return;
            }

            getPropHandler(me.tagName, name).prop(me.el, value, name, me);
        }
    );

    // update prop
    var dynamicProps = this.aNode.hotspot.dynamicProps;
    for (var i = 0, l = dynamicProps.length; i < l; i++) {
        var prop = dynamicProps[i];

        for (var j = 0, changeLen = changes.length; j < changeLen; j++) {
            var change = changes[j];

            if (!isDataChangeByElement(change, this, prop.name)
                && (
                    changeExprCompare(change.expr, prop.expr, this.scope)
                    || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.scope)
                )
            ) {
                handleProp(this, evalExpr(prop.expr, this.scope, this.owner), prop);
                break;
            }
        }
    }

    // update content
    var htmlDirective = this.aNode.directives.html;
    if (htmlDirective) {
        var len = changes.length;
        while (len--) {
            if (changeExprCompare(changes[len].expr, htmlDirective.value, this.scope)) {
                // #[begin] error
                warnSetHTML(this.el);
                // #[end]

                this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
                break;
            }
        }
    }
    else {
        elementUpdateChildren(this, changes);
    }
};

/**
 * 执行完成attached状态的行为
 */
Element.prototype._attached = elementOwnAttached;

// exports = module.exports = Element;


/**
 * @file 销毁节点，清空节点上的无用成员
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 销毁节点
 *
 * @param {Object} node 节点对象
 */
function nodeDispose(node) {
    node.el = null;
    node.sel = null;
    node.owner = null;
    node.scope = null;
    node.aNode = null;
    node.parent = null;
    node.parentComponent = null;
    node.children = null;

    if (node._toPhase) {
        node._toPhase('disposed');
    }

    if (node._ondisposed) {
        node._ondisposed();
    }
}

// exports = module.exports = nodeDispose;


/**
 * @file 初始化节点的 s-bind 数据
 * @author errorrik(errorrik@gmail.com)
 */


// var evalExpr = require('../runtime/eval-expr');

/**
 * 初始化节点的 s-bind 数据
 *
 * @param {Object} node 节点对象
 * @param {Object} sBind bind指令对象
 * @return {boolean}
 */
function nodeSBindInit(node, sBind) {
    if (sBind && node.scope) {
        node._sbindData = evalExpr(sBind.value, node.scope, node.owner);
        return true;
    }
}

// exports = module.exports = nodeSBindInit;


/**
 * @file 计算两个对象 key 的并集
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 计算两个对象 key 的并集
 *
 * @param {Object} obj1 目标对象
 * @param {Object} obj2 源对象
 * @return {Array}
 */
function unionKeys(obj1, obj2) {
    var result = [];

    for (var key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            result.push(key);
        }
    }

    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            !obj1[key] && result.push(key);
        }
    }

    return result;
}

// exports = module.exports = unionKeys;


/**
 * @file 更新节点的 s-bind 数据
 * @author errorrik(errorrik@gmail.com)
 */

// var unionKeys = require('../util/union-keys');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');

/**
 * 初始化节点的 s-bind 数据
 *
 * @param {Object} node 节点对象
 * @param {Object} sBind bind指令对象
 * @param {Array} changes 变更数组
 * @param {Function} updater 绑定对象子项变更的更新函数
 */
function nodeSBindUpdate(node, sBind, changes, updater) {
    if (sBind) {
        var len = changes.length;

        while (len--) {
            if (changeExprCompare(changes[len].expr, sBind.value, node.scope)) {
                var newBindData = evalExpr(sBind.value, node.scope, node.owner);
                var keys = unionKeys(newBindData, node._sbindData);

                for (var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    var value = newBindData[key];

                    if (value !== node._sbindData[key]) {
                        updater(key, value);
                    }
                }

                node._sbindData = newBindData;
                break;
            }

        }
    }
}

// exports = module.exports = nodeSBindUpdate;


/**
 * @file 通过组件反解创建节点的工厂方法
 * @author errorrik(errorrik@gmail.com)
 */

// var NodeType = require('./node-type');
// var TextNode = require('./text-node');
// var Element = require('./element');
// var SlotNode = require('./slot-node');
// var ForNode = require('./for-node');
// var IfNode = require('./if-node');
// var TemplateNode = require('./template-node');

// #[begin] reverse
/**
 * 通过组件反解创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {DOMChildrenWalker} reverseWalker 子元素遍历对象
 * @param {Node} parent 父亲节点
 * @param {Model=} scope 所属数据环境
 * @return {Node}
 */
function createReverseNode(aNode, reverseWalker, parent, scope) {
    var parentIsComponent = parent.nodeType === 5;
    var owner = parentIsComponent ? parent : (parent.childOwner || parent.owner);
    scope = scope || (parentIsComponent ? parent.data : (parent.childScope || parent.scope));

    if (aNode.textExpr) {
        return new TextNode(aNode, owner, scope, parent, reverseWalker);
    }

    if (aNode.directives['if']) { // eslint-disable-line dot-notation
        return new IfNode(aNode, owner, scope, parent, reverseWalker);
    }

    if (aNode.directives['for']) { // eslint-disable-line dot-notation
        return new ForNode(aNode, owner, scope, parent, reverseWalker);
    }

    switch (aNode.tagName) {
        case 'slot':
            return new SlotNode(aNode, owner, scope, parent, reverseWalker);

        case 'template':
            return new TemplateNode(aNode, owner, scope, parent, reverseWalker);

        default:
            var ComponentType = owner.getComponentType
                ? owner.getComponentType(aNode)
                : owner.components[aNode.tagName];

            if (ComponentType) {
                return new ComponentType({
                    aNode: aNode,
                    owner: owner,
                    scope: scope,
                    parent: parent,
                    subTag: aNode.tagName,
                    reverseWalker: reverseWalker
                });
            }
    }

    return new Element(aNode, owner, scope, parent, reverseWalker);
}
// #[end]

// exports = module.exports = createReverseNode;


/**
 * @file 销毁释放元素的子元素
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 销毁释放元素的子元素
 *
 * @param {Object} element 元素节点
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementDisposeChildren(element, noDetach, noTransition) {
    var children = element.children;
    var len = children && children.length;
    while (len--) {
        children[len].dispose(noDetach, noTransition);
    }
}

// exports = module.exports = elementDisposeChildren;


/**
 * @file 更新元素的子元素视图
 * @author errorrik(errorrik@gmail.com)
 */


/**
 * 更新元素的子元素视图
 *
 * @param {Object} element 要更新的元素
 * @param {Array} changes 数据变化信息
 */
function elementUpdateChildren(element, changes) {
    for (var i = 0, l = element.children.length; i < l; i++) {
        element.children[i]._update(changes);
    }
}

// exports = module.exports = elementUpdateChildren;


/**
 * @file 使元素节点到达相应的生命周期
 * @author errorrik(errorrik@gmail.com)
 */


// var LifeCycle = require('./life-cycle');

/**
 * 使元素节点到达相应的生命周期
 *
 * @param {string} name 生命周期名称
 */
function elementOwnToPhase(name) {
    this.lifeCycle = LifeCycle[name] || this.lifeCycle;
}

// exports = module.exports = elementOwnToPhase;


/**
 * @file 创建节点的工厂方法
 * @author errorrik(errorrik@gmail.com)
 */

// var NodeType = require('./node-type');
// var TextNode = require('./text-node');
// var Element = require('./element');
// var SlotNode = require('./slot-node');
// var ForNode = require('./for-node');
// var IfNode = require('./if-node');
// var TemplateNode = require('./template-node');


/**
 * 创建节点
 *
 * @param {ANode} aNode 抽象节点
 * @param {Node} parent 父亲节点
 * @param {Model=} scope 所属数据环境
 * @return {Node}
 */
function createNode(aNode, parent, scope) {
    var parentIsComponent = parent.nodeType === 5;
    var owner = parentIsComponent ? parent : (parent.childOwner || parent.owner);
    scope = scope || (parentIsComponent ? parent.data : (parent.childScope || parent.scope));


    if (aNode.textExpr) {
        return new TextNode(aNode, owner, scope, parent);
    }

    if (aNode.directives['if']) { // eslint-disable-line dot-notation
        return new IfNode(aNode, owner, scope, parent);
    }

    if (aNode.directives['for']) { // eslint-disable-line dot-notation
        return new ForNode(aNode, owner, scope, parent);
    }

    switch (aNode.tagName) {
        case 'slot':
            return new SlotNode(aNode, owner, scope, parent);

        case 'template':
            return new TemplateNode(aNode, owner, scope, parent);

        default:
            var ComponentType = owner.getComponentType
                ? owner.getComponentType(aNode)
                : owner.components[aNode.tagName];

            if (ComponentType) {
                return new ComponentType({
                    aNode: aNode,
                    owner: owner,
                    scope: scope,
                    parent: parent,
                    subTag: aNode.tagName
                });
            }
    }

    return new Element(aNode, owner, scope, parent);
}

// exports = module.exports = createNode;


/**
 * @file 生成子元素
 * @author errorrik(errorrik@gmail.com)
 */

// var createNode = require('./create-node');

/**
 * 生成子元素
 *
 * @param {Element} element 元素
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function genElementChildren(element, parentEl, beforeEl) {
    parentEl = parentEl || element.el;

    var aNodeChildren = element.aNode.children;
    for (var i = 0; i < aNodeChildren.length; i++) {
        var child = createNode(aNodeChildren[i], element);
        element.children.push(child);
        child.attach(parentEl, beforeEl);
    }
}

// exports = module.exports = genElementChildren;


/**
 * @file 将没有 root 只有 children 的元素 attach 到页面
 * @author errorrik(errorrik@gmail.com)
 */


// var insertBefore = require('../browser/insert-before');
// var genElementChildren = require('./gen-element-children');


/**
 * 将没有 root 只有 children 的元素 attach 到页面
 * 主要用于 slot 和 template
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function nodeOwnOnlyChildrenAttach(parentEl, beforeEl) {
    this.sel = document.createComment(this.id);
    insertBefore(this.sel, parentEl, beforeEl);

    genElementChildren(this, parentEl, beforeEl);

    this.el = document.createComment(this.id);
    insertBefore(this.el, parentEl, beforeEl);

    this._toPhase('attached');
}

// exports = module.exports = nodeOwnOnlyChildrenAttach;


/**
 * @file slot 节点类
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var createANode = require('../parser/create-a-node');
// var ExprType = require('../parser/expr-type');
// var createAccessor = require('../parser/create-accessor');
// var evalExpr = require('../runtime/eval-expr');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var nodeDispose = require('./node-dispose');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var elementUpdateChildren = require('./element-update-children');
// var elementOwnToPhase = require('./element-own-to-phase');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');


/**
 * slot 节点类
 *
 * @param {Object} aNode 抽象节点
 * @param {Component} owner 所属组件环境
 * @param {Model=} scope 所属数据环境
 * @param {Node} parent 父亲节点
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function SlotNode(aNode, owner, scope, parent, reverseWalker) {
    var realANode = createANode();
    this.aNode = realANode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid();

    this.lifeCycle = LifeCycle.start;
    this.children = [];

    // calc slot name
    this.nameBind = getANodeProp(aNode, 'name');
    if (this.nameBind) {
        this.isNamed = true;
        this.name = evalExpr(this.nameBind.expr, this.scope, this.owner);
    }

    // calc aNode children
    var givenSlots = owner.givenSlots;
    var givenChildren;
    if (givenSlots) {
        givenChildren = this.isNamed ? givenSlots.named[this.name] : givenSlots.noname;
    }

    if (givenChildren) {
        this.isInserted = true;
    }

    realANode.children = givenChildren || aNode.children.slice(0);

    var me = this;

    // calc scoped slot vars
    realANode.vars = aNode.vars;
    realANode.directives = aNode.directives;

    var initData;
    if (nodeSBindInit(this, aNode.directives.bind)) {
        initData = extend({}, this._sbindData);
    }

    if (realANode.vars) {
        initData = initData || {};
        each(realANode.vars, function (varItem) {
            initData[varItem.name] = evalExpr(varItem.expr, scope, owner);
        });
    }

    // child owner & child scope
    if (this.isInserted) {
        this.childOwner = owner.owner;
        this.childScope = owner.scope;
    }

    if (initData) {
        this.isScoped = true;
        this.childScope = new Data(initData, this.childScope || this.scope);
    }


    owner.slotChildren.push(this);

    // #[begin] reverse
    if (reverseWalker) {

        this.sel = document.createComment(this.id);
        insertBefore(this.sel, reverseWalker.target, reverseWalker.current);

        each(this.aNode.children, function (aNodeChild) {
            me.children.push(createReverseNode(aNodeChild, reverseWalker, me));
        });

        this.el = document.createComment(this.id);
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);

        this._toPhase('attached');
    }
    // #[end]
}

SlotNode.prototype.nodeType = 6;

/**
 * 销毁释放 slot
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
SlotNode.prototype.dispose = function (noDetach, noTransition) {
    this.childOwner = null;
    this.childScope = null;

    elementDisposeChildren(this, noDetach, noTransition);

    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }
    nodeDispose(this);
};

SlotNode.prototype.attach = nodeOwnOnlyChildrenAttach;
SlotNode.prototype._toPhase = elementOwnToPhase;

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 * @param {boolean=} isFromOuter 变化信息是否来源于父组件之外的组件
 * @return {boolean}
 */
SlotNode.prototype._update = function (changes, isFromOuter) {
    var me = this;

    if (this.nameBind && evalExpr(this.nameBind.expr, this.scope, this.owner) !== this.name) {
        this.owner._notifyNeedReload();
        return false;
    }

    if (isFromOuter) {
        if (this.isInserted) {
            elementUpdateChildren(this, changes);
        }
    }
    else {
        if (this.isScoped) {
            var varKeys = {};
            each(this.aNode.vars, function (varItem) {
                varKeys[varItem.name] = 1;
                me.childScope.set(varItem.name, evalExpr(varItem.expr, me.scope, me.owner));
            });

            var scopedChanges = [];

            nodeSBindUpdate(
                this,
                this.aNode.directives.bind,
                changes,
                function (name, value) {
                    if (varKeys[name]) {
                        return;
                    }

                    me.childScope.set(name, value);
                    scopedChanges.push({
                        type: 1,
                        expr: createAccessor([
                            {type: 1, value: name}
                        ]),
                        value: value,
                        option: {}
                    });
                }
            );

            each(changes, function (change) {
                if (!me.isInserted) {
                    scopedChanges.push(change);
                }

                each(me.aNode.vars, function (varItem) {
                    var name = varItem.name;
                    var relation = changeExprCompare(change.expr, varItem.expr, me.scope);

                    if (relation < 1) {
                        return;
                    }

                    if (change.type !== 2) {
                        scopedChanges.push({
                            type: 1,
                            expr: createAccessor([
                                {type: 1, value: name}
                            ]),
                            value: me.childScope.get(name),
                            option: change.option
                        });
                    }
                    else if (relation === 2) {
                        scopedChanges.push({
                            expr: createAccessor([
                                {type: 1, value: name}
                            ]),
                            type: 2,
                            index: change.index,
                            deleteCount: change.deleteCount,
                            value: change.value,
                            insertions: change.insertions,
                            option: change.option
                        });
                    }
                });
            });

            elementUpdateChildren(this, scopedChanges);
        }
        else if (!this.isInserted) {
            elementUpdateChildren(this, changes);
        }
    }
};

// exports = module.exports = SlotNode;


/**
 * @file 复制指令集合对象
 * @author errorrik(errorrik@gmail.com)
 */

/**
 * 复制指令集合对象
 *
 * @param {Object} source 要复制的指令集合对象
 * @param {Object=} excludes 需要排除的key集合
 * @return {Object}
 */
function cloneDirectives(source, excludes) {
    var result = {};
    excludes = excludes || {};

    for (var key in source) {
        if (!excludes[key]) {
            result[key] = source[key];
        }
    }

    return result;
}

// exports = module.exports = cloneDirectives;


/**
 * @file 简单执行销毁节点的行为
 * @author errorrik(errorrik@gmail.com)
 */

// var removeEl = require('../browser/remove-el');
// var nodeDispose = require('./node-dispose');
// var elementDisposeChildren = require('./element-dispose-children');

/**
 * 简单执行销毁节点的行为
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 */
function nodeOwnSimpleDispose(noDetach) {
    elementDisposeChildren(this, noDetach, 1);

    if (!noDetach) {
        removeEl(this.el);
    }

    nodeDispose(this);
}

// exports = module.exports = nodeOwnSimpleDispose;


/**
 * @file 创建节点对应的 stump comment 元素
 * @author errorrik(errorrik@gmail.com)
 */



/**
 * 创建节点对应的 stump comment 主元素
 */
function nodeOwnCreateStump() {
    this.el = this.el || document.createComment(this.id);
}

// exports = module.exports = nodeOwnCreateStump;


/**
 * @file for 指令节点类
 * @author errorrik(errorrik@gmail.com)
 */

// var inherits = require('../util/inherits');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var createANode = require('../parser/create-a-node');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var createAccessor = require('../parser/create-accessor');
// var cloneDirectives = require('../parser/clone-directives');
// var Data = require('../runtime/data');
// var DataChangeType = require('../runtime/data-change-type');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var evalExpr = require('../runtime/eval-expr');
// var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
// var insertBefore = require('../browser/insert-before');
// var NodeType = require('./node-type');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var dataCache = require('../runtime/data-cache');


/**
 * 循环项的数据容器类
 *
 * @inner
 * @class
 * @param {Object} forElement for元素对象
 * @param {*} item 当前项的数据
 * @param {number} index 当前项的索引
 */
function ForItemData(forElement, item, index) {
    this.id = guid();
    this.parent = forElement.scope;
    this.raw = {};
    this.listeners = [];

    this.directive = forElement.aNode.directives['for']; // eslint-disable-line dot-notation
    this.raw[this.directive.item.raw] = item;
    this.raw[this.directive.index.raw] = index;
}

/**
 * 将数据操作的表达式，转换成为对parent数据操作的表达式
 * 主要是对item和index进行处理
 *
 * @param {Object} expr 表达式
 * @return {Object}
 */
ForItemData.prototype.exprResolve = function (expr) {
    var directive = this.directive;
    var me = this;

    function resolveItem(expr) {
        if (expr.type === 4
            && expr.paths[0].value === directive.item.paths[0].value
        ) {
            return createAccessor(
                directive.value.paths.concat(
                    {
                        type: 2,
                        value: me.get(directive.index)
                    },
                    expr.paths.slice(1)
                )
            );
        }

        return expr;
    }

    expr = resolveItem(expr);

    var resolvedPaths = [];

    each(expr.paths, function (item) {
        resolvedPaths.push(
            item.type === 4
                && item.paths[0].value === directive.index.paths[0].value
            ? {
                type: 2,
                value: me.get(directive.index)
            }
            : resolveItem(item)
        );
    });

    return createAccessor(resolvedPaths);
};

// 代理数据操作方法
inherits(ForItemData, Data);
each(
    ['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'],
    function (method) {
        ForItemData.prototype['_' + method] = Data.prototype[method];
        ForItemData.prototype[method] = function (expr) {
            expr = this.exprResolve(parseExpr(expr));
            dataCache.clear();
            this.parent[method].apply(
                this.parent,
                [expr].concat(Array.prototype.slice.call(arguments, 1))
            );
        };
    }
);

/**
 * 创建 for 指令元素的子元素
 *
 * @inner
 * @param {ForDirective} forElement for 指令元素对象
 * @param {*} item 子元素对应数据
 * @param {number} index 子元素对应序号
 * @return {Element}
 */
function createForDirectiveChild(forElement, item, index) {
    var itemScope = new ForItemData(forElement, item, index);
    return createNode(forElement.itemANode, forElement, itemScope);
}

/**
 * for 指令节点类
 *
 * @param {Object} aNode 抽象节点
 * @param {Component} owner 所属组件环境
 * @param {Model=} scope 所属数据环境
 * @param {Node} parent 父亲节点
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function ForNode(aNode, owner, scope, parent, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid();
    this.children = [];

    this.itemANode = createANode({
        children: aNode.children,
        props: aNode.props,
        events: aNode.events,
        tagName: aNode.tagName,
        vars: aNode.vars,
        hotspot: aNode.hotspot,
        directives: cloneDirectives(aNode.directives, {
            'for': 1
        })
    });

    this.param = aNode.directives['for']; // eslint-disable-line dot-notation

    // #[begin] reverse
    if (reverseWalker) {
        var me = this;
        this.listData = evalExpr(this.param.value, this.scope, this.owner);
        eachForData(
            this,
            function (item, i) {
                var itemScope = new ForItemData(me, item, i);
                var child = createReverseNode(me.itemANode, reverseWalker, me, itemScope);
                me.children.push(child);
            }
        );

        this._create();
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);
    }
    // #[end]
}


ForNode.prototype.nodeType = 3;
ForNode.prototype._create = nodeOwnCreateStump;
ForNode.prototype.dispose = nodeOwnSimpleDispose;

/**
 * 对 for 节点数据进行遍历
 *
 * @inner
 * @param {ForNode} forNode for节点对象
 * @param {Function} fn 数据遍历函数
 */
function eachForData(forNode, fn) {
    var listData = forNode.listData;

    if (listData instanceof Array) {
        for (var i = 0; i < listData.length; i++) {
            fn(listData[i], i);
        }
    }
    else if (listData && typeof listData === 'object') {
        for (var i in listData) {
            if (listData.hasOwnProperty(i)) {
                (listData[i] != null) && fn(listData[i], i);
            }
        }
    }
}

/**
 * 将元素attach到页面的行为
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
ForNode.prototype.attach = function (parentEl, beforeEl) {
    this._create();
    insertBefore(this.el, parentEl, beforeEl);
    this.listData = evalExpr(this.param.value, this.scope, this.owner);

    this._createChildren();
};

/**
 * 创建子元素
 */
ForNode.prototype._createChildren = function () {
    var me = this;
    var parentEl = this.el.parentNode;

    eachForData(this, function (value, i) {
        var child = createForDirectiveChild(me, value, i);
        me.children.push(child);
        child.attach(parentEl, me.el);
    });
};

/* eslint-disable fecs-max-statements */

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
ForNode.prototype._update = function (changes) {
    var listData = evalExpr(this.param.value, this.scope, this.owner);
    var oldIsArr = this.listData instanceof Array;
    var newIsArr = listData instanceof Array;

    if (this.children.length) {
        if (!listData || newIsArr && listData.length === 0) {
            this._disposeChildren();
            this.listData = listData;
            return;
        }

        // 就是这么暴力
        // 不推荐使用for遍历object，用的话自己负责
        if (oldIsArr !== newIsArr || !newIsArr) {
            this.listData = listData;
            var me = this;
            this._disposeChildren(null, function () {
                me._createChildren();
            });
            return;
        }

        this._updateArray(changes, listData);
        this.listData = listData;
    }
    else {
        this.listData = listData;
        this._createChildren();
    }
};

/**
 * 销毁释放子元素
 *
 * @param {Array?} children 要销毁的子元素，默认为自身的children
 * @param {Function} callback 释放完成的回调函数
 */
ForNode.prototype._disposeChildren = function (children, callback) {
    var parentEl = this.el.parentNode;
    var parentFirstChild = parentEl.firstChild;
    var parentLastChild = parentEl.lastChild;

    var len = this.children.length;

    var violentClear = !this.aNode.directives.transition
        && !children
        // 是否 parent 的唯一 child
        && (len
                && parentFirstChild === this.children[0].el
                && (parentLastChild === this.el
                    || parentLastChild === this.children[len - 1].el)
            || len === 0
                && parentFirstChild === this.el
                && parentLastChild === this.el
        );

    if (!children) {
        children = this.children;
        this.children = [];
    }


    var me = this;
    var disposedChildCount = 0;
    len = children.length;
    if (!len) {
        childDisposed();
    }
    else {
        for (var i = 0; i < len; i++) {
            var disposeChild = children[i];
            if (disposeChild) {
                disposeChild._ondisposed = childDisposed;
                disposeChild.dispose(violentClear, violentClear);
            }
            else {
                childDisposed();
            }
        }
    }

    function childDisposed() {
        disposedChildCount++;
        if (disposedChildCount >= len) {
            if (violentClear) {
                // cloneNode + replaceChild is faster
                // parentEl.innerHTML = '';
                var replaceNode = parentEl.cloneNode(false);
                parentEl.parentNode.replaceChild(replaceNode, parentEl);
                me.el = document.createComment(me.id);
                replaceNode.appendChild(me.el);
            }

            callback && callback();
        }
    }
};

/**
 * 数组类型的视图更新
 *
 * @param {Array} changes 数据变化信息
 * @param {Array} newList 新数组数据
 */
ForNode.prototype._updateArray = function (changes, newList) {
    var oldChildrenLen = this.children.length;
    var childrenChanges = new Array(oldChildrenLen);

    function pushToChildrenChanges(change) {
        for (var i = 0, l = childrenChanges.length; i < l; i++) {
            (childrenChanges[i] = childrenChanges[i] || []).push(change);
        }
    }

    var disposeChildren = [];

    // 控制列表是否整体更新的变量
    var isChildrenRebuild;

    var newLen = newList.length;

    /* eslint-disable no-redeclare */
    for (var cIndex = 0; cIndex < changes.length; cIndex++) {
        var change = changes[cIndex];
        var relation = changeExprCompare(change.expr, this.param.value, this.scope);

        if (!relation) {
            // 无关时，直接传递给子元素更新，列表本身不需要动
            pushToChildrenChanges(change);
        }
        else if (relation > 2) {
            // 变更表达式是list绑定表达式的子项
            // 只需要对相应的子项进行更新
            var changePaths = change.expr.paths;
            var forLen = this.param.value.paths.length;
            var changeIndex = +evalExpr(changePaths[forLen], this.scope, this.owner);

            if (isNaN(changeIndex)) {
                pushToChildrenChanges(change);
            }
            else {
                (childrenChanges[changeIndex] = childrenChanges[changeIndex] || [])
                    .push(change);

                change = {
                    type: change.type,
                    expr: createAccessor(
                        this.param.item.paths.concat(changePaths.slice(forLen + 1))
                    ),
                    value: change.value,
                    index: change.index,
                    deleteCount: change.deleteCount,
                    insertions: change.insertions,
                    option: change.option
                };

                childrenChanges[changeIndex].push(change);

                if (change.type === 1) {
                    if (this.children[changeIndex]) {
                        this.children[changeIndex].scope._set(
                            change.expr,
                            change.value,
                            { silent: 1 }
                        );
                    }
                    else {
                        // 设置数组项的索引可能超出数组长度，此时需要新增
                        // 比如当前数组只有2项，但是set list[4]
                        this.children[changeIndex] = 0;
                    }
                }
                else if (this.children[changeIndex]) {
                    this.children[changeIndex].scope._splice(
                        change.expr,
                        [].concat(change.index, change.deleteCount, change.insertions),
                        { silent: 1 }
                    );
                }
            }
        }
        else if (change.type !== 2) {
            // 变更表达式是list绑定表达式本身或母项的重新设值
            // 此时需要更新整个列表

            var getItemKey = this.aNode.hotspot.getForKey;
            if (getItemKey && newLen && oldChildrenLen) {
                // 如果设置了trackBy，用lcs更新。开始 ====
                var lcsFlags = [];
                var newListKeys = [];
                var oldListKeys = [];

                each(newList, function (item) {
                    newListKeys.push(getItemKey(item));
                });

                each(this.listData, function (item) {
                    oldListKeys.push(getItemKey(item));
                });


                var newIndex;
                var oldIndex;
                for (oldIndex = 0; oldIndex <= oldChildrenLen; oldIndex++) {
                    lcsFlags.push([]);

                    for (newIndex = 0; newIndex <= newLen; newIndex++) {
                        var lcsFlag = 0;
                        if (newIndex && oldIndex) {
                            lcsFlag = newListKeys[newIndex - 1] === oldListKeys[oldIndex - 1]
                                ? lcsFlags[oldIndex - 1][newIndex - 1] + 1
                                : Math.max(lcsFlags[oldIndex - 1][newIndex], lcsFlags[oldIndex][newIndex - 1]);
                        }

                        lcsFlags[oldIndex].push(lcsFlag);
                    }
                }

                newIndex--;
                oldIndex--;
                while (1) {
                    if (oldIndex && newIndex && oldListKeys[oldIndex - 1] === newListKeys[newIndex - 1]) {
                        newIndex--;
                        oldIndex--;

                        // 如果数据本身引用发生变化，设置变更
                        if (this.listData[oldIndex] !== newList[newIndex]) {
                            (childrenChanges[oldIndex] = childrenChanges[oldIndex] || []).push({
                                type: 1,
                                option: change.option,
                                expr: createAccessor(this.param.item.paths.slice(0)),
                                value: newList[newIndex]
                            });
                        }

                        // 对list更上级数据的直接设置
                        if (relation < 2) {
                            (childrenChanges[oldIndex] = childrenChanges[oldIndex] || []).push(change);
                        }
                    }
                    else if (newIndex
                        && (!oldIndex || lcsFlags[oldIndex][newIndex - 1] >= lcsFlags[oldIndex - 1][newIndex])
                    ) {
                        newIndex--;
                        childrenChanges.splice(oldIndex, 0, 0);
                        this.children.splice(oldIndex, 0, 0);
                    }
                    else if (oldIndex
                        && (!newIndex || lcsFlags[oldIndex][newIndex - 1] < lcsFlags[oldIndex - 1][newIndex])
                    ) {
                        oldIndex--;
                        disposeChildren.push(this.children[oldIndex]);
                        childrenChanges.splice(oldIndex, 1);
                        this.children.splice(oldIndex, 1);
                    }
                    else {
                        break;
                    }
                }
                // 如果设置了trackBy，用lcs更新。结束 ====
            }
            else {
                // 老的比新的多的部分，标记需要dispose
                if (oldChildrenLen > newLen) {
                    disposeChildren = disposeChildren.concat(this.children.slice(newLen));
                    childrenChanges = childrenChanges.slice(0, newLen);
                    this.children = this.children.slice(0, newLen);
                }

                // 剩下的部分整项变更
                for (var i = 0; i < newLen; i++) {
                    (childrenChanges[i] = childrenChanges[i] || []).push({
                        type: 1,
                        option: change.option,
                        expr: createAccessor(this.param.item.paths.slice(0)),
                        value: newList[i]
                    });

                    // 对list更上级数据的直接设置
                    if (relation < 2) {
                        childrenChanges[i].push(change);
                    }

                    if (this.children[i]) {
                        this.children[i].scope._set(
                            this.param.item,
                            newList[i],
                            {silent: 1}
                        );
                    }
                    else {
                        this.children[i] = 0;
                    }
                }
            }

            isChildrenRebuild = 1;
        }
        else if (relation === 2 && change.type === 2 && !isChildrenRebuild) {
            // 变更表达式是list绑定表达式本身数组的splice操作
            // 此时需要删除部分项，创建部分项
            var changeStart = change.index;
            var deleteCount = change.deleteCount;
            var insertionsLen = change.insertions.length;
            var newCount = insertionsLen - deleteCount;

            if (newCount) {
                var indexChange = {
                    type: 1,
                    option: change.option,
                    expr: this.param.index
                };

                for (var i = changeStart + deleteCount; i < this.children.length; i++) {
                    (childrenChanges[i] = childrenChanges[i] || []).push(indexChange);
                    this.children[i] && this.children[i].scope._set(
                        indexChange.expr,
                        i - deleteCount + insertionsLen,
                        {silent: 1}
                    );
                }
            }

            var deleteLen = deleteCount;
            while (deleteLen--) {
                if (deleteLen < insertionsLen) {
                    var i = changeStart + deleteLen;
                    // update
                    (childrenChanges[i] = childrenChanges[i] || []).push({
                        type: 1,
                        option: change.option,
                        expr: createAccessor(this.param.item.paths.slice(0)),
                        value: change.insertions[deleteLen]
                    });
                    if (this.children[i]) {
                        this.children[i].scope._set(
                            this.param.item,
                            change.insertions[deleteLen],
                            {silent: 1}
                        );
                    }
                }
            }

            if (newCount < 0) {
                disposeChildren = disposeChildren.concat(this.children.splice(changeStart + insertionsLen, -newCount));
                childrenChanges.splice(changeStart + insertionsLen, -newCount);
            }
            else if (newCount > 0) {
                var spliceArgs = [changeStart + deleteCount, 0].concat(new Array(newCount));
                this.children.splice.apply(this.children, spliceArgs);
                childrenChanges.splice.apply(childrenChanges, spliceArgs);
            }
        }
    }

    var newChildrenLen = this.children.length;

    // 标记 length 是否发生变化
    if (newChildrenLen !== oldChildrenLen && this.param.value.paths) {
        var lengthChange = {
            type: 1,
            option: {},
            expr: createAccessor(
                this.param.value.paths.concat({
                    type: 1,
                    value: 'length'
                })
            )
        };

        if (changesIsInDataRef([lengthChange], this.aNode.hotspot.data)) {
            pushToChildrenChanges(lengthChange);
        }
    }

    // 执行视图更新，先删再刷新
    this._doCreateAndUpdate = doCreateAndUpdate;

    var me = this;
    if (disposeChildren.length === 0) {
        doCreateAndUpdate();
    }
    else {
        this._disposeChildren(disposeChildren, function () {
            if (doCreateAndUpdate === me._doCreateAndUpdate) {
                doCreateAndUpdate();
            }
        });
    }

    function doCreateAndUpdate() {
        me._doCreateAndUpdate = null;

        var beforeEl = me.el;
        var parentEl = beforeEl.parentNode;

        // 对相应的项进行更新
        // 如果不attached则直接创建，如果存在则调用更新函数
        var j = -1;
        for (var i = 0; i < newChildrenLen; i++) {
            var child = me.children[i];

            if (child) {
                childrenChanges[i] && child._update(childrenChanges[i]);
            }
            else {
                if (j < i) {
                    j = i + 1;
                    beforeEl = null;
                    while (j < newChildrenLen) {
                        var nextChild = me.children[j];
                        if (nextChild) {
                            beforeEl = nextChild.sel || nextChild.el;
                            break;
                        }
                        j++;
                    }
                }

                me.children[i] = createForDirectiveChild(me, newList[i], i);
                me.children[i].attach(parentEl, beforeEl || me.el);
            }
        }
    }
};


// exports = module.exports = ForNode;


/**
 * @file 清洗条件 aNode
 * @author errorrik(errorrik@gmail.com)
 */


// var createANode = require('../parser/create-a-node');
// var cloneDirectives = require('../parser/clone-directives');


/**
 * 清洗条件 aNode，返回纯净无条件指令的 aNode
 *
 * @param {ANode} aNode 条件节点对象
 * @return {ANode}
 */
function rinseCondANode(aNode) {
    var clearANode = createANode({
        children: aNode.children,
        props: aNode.props,
        events: aNode.events,
        tagName: aNode.tagName,
        vars: aNode.vars,
        hotspot: aNode.hotspot,
        directives: cloneDirectives(aNode.directives, {
            'if': 1,
            'else': 1,
            'elif': 1
        })
    });

    return clearANode;
}

// exports = module.exports = rinseCondANode;


/**
 * @file if 指令节点类
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var evalExpr = require('../runtime/eval-expr');
// var NodeType = require('./node-type');
// var rinseCondANode = require('./rinse-cond-anode');
// var createNode = require('./create-node');
// var createReverseNode = require('./create-reverse-node');
// var nodeOwnCreateStump = require('./node-own-create-stump');
// var elementUpdateChildren = require('./element-update-children');
// var nodeOwnSimpleDispose = require('./node-own-simple-dispose');

/**
 * if 指令节点类
 *
 * @param {Object} aNode 抽象节点
 * @param {Component} owner 所属组件环境
 * @param {Model=} scope 所属数据环境
 * @param {Node} parent 父亲节点
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function IfNode(aNode, owner, scope, parent, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid();
    this.children = [];

    this.cond = this.aNode.directives['if'].value; // eslint-disable-line dot-notation

    // #[begin] reverse
    if (reverseWalker) {
        if (evalExpr(this.cond, this.scope, this.owner)) {
            this.elseIndex = -1;
            this.children[0] = createReverseNode(
                rinseCondANode(aNode),
                reverseWalker,
                this
            );
        }
        else {
            var me = this;
            each(aNode.elses, function (elseANode, index) {
                var elif = elseANode.directives.elif;

                if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
                    me.elseIndex = index;
                    me.children[0] = createReverseNode(
                        rinseCondANode(elseANode),
                        reverseWalker,
                        me
                    );
                    return false;
                }
            });
        }

        this._create();
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);
    }
    // #[end]
}

IfNode.prototype.nodeType = 2;

IfNode.prototype._create = nodeOwnCreateStump;
IfNode.prototype.dispose = nodeOwnSimpleDispose;

IfNode.prototype.attach = function (parentEl, beforeEl) {
    var me = this;
    var elseIndex;
    var child;

    if (evalExpr(this.cond, this.scope, this.owner)) {
        child = createNode(rinseCondANode(this.aNode), this);
        elseIndex = -1;
    }
    else {
        each(this.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;

            if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
                child = createNode(rinseCondANode(elseANode), me);
                elseIndex = index;
                return false;
            }
        });
    }

    if (child) {
        this.children[0] = child;
        child.attach(parentEl, beforeEl);
        this.elseIndex = elseIndex;
    }


    this._create();
    insertBefore(this.el, parentEl, beforeEl);
};


/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
IfNode.prototype._update = function (changes) {
    var me = this;
    var childANode = this.aNode;
    var elseIndex;

    if (evalExpr(this.cond, this.scope, this.owner)) {
        elseIndex = -1;
    }
    else {
        each(this.aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;

            if (elif && evalExpr(elif.value, me.scope, me.owner) || !elif) {
                elseIndex = index;
                childANode = elseANode;
                return false;
            }
        });
    }

    if (elseIndex === this.elseIndex) {
        elementUpdateChildren(this, changes);
    }
    else {
        var child = this.children[0];
        this.children = [];
        if (child) {
            child._ondisposed = newChild;
            child.dispose();
        }
        else {
            newChild();
        }

        this.elseIndex = elseIndex;
    }

    function newChild() {
        if (typeof elseIndex !== 'undefined') {
            (me.children[0] = createNode(rinseCondANode(childANode), me))
                .attach(me.el.parentNode, me.el);
        }
    }
};

// exports = module.exports = IfNode;


/**
 * @file template 节点类
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var guid = require('../util/guid');
// var insertBefore = require('../browser/insert-before');
// var removeEl = require('../browser/remove-el');
// var NodeType = require('./node-type');
// var LifeCycle = require('./life-cycle');
// var nodeDispose = require('./node-dispose');
// var createReverseNode = require('./create-reverse-node');
// var elementDisposeChildren = require('./element-dispose-children');
// var elementOwnToPhase = require('./element-own-to-phase');
// var elementUpdateChildren = require('./element-update-children');
// var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');

/**
 * template 节点类
 *
 * @param {Object} aNode 抽象节点
 * @param {Component} owner 所属组件环境
 * @param {Model=} scope 所属数据环境
 * @param {Node} parent 父亲节点
 * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
 */
function TemplateNode(aNode, owner, scope, parent, reverseWalker) {
    this.aNode = aNode;
    this.owner = owner;
    this.scope = scope;
    this.parent = parent;
    this.parentComponent = parent.nodeType === 5
        ? parent
        : parent.parentComponent;

    this.id = guid();
    this.lifeCycle = LifeCycle.start;
    this.children = [];

    // #[begin] reverse
    if (reverseWalker) {
        this.sel = document.createComment(this.id);
        insertBefore(this.sel, reverseWalker.target, reverseWalker.current);

        var me = this;
        each(this.aNode.children, function (aNodeChild) {
            me.children.push(createReverseNode(aNodeChild, reverseWalker, me));
        });

        this.el = document.createComment(this.id);
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);

        this._toPhase('attached');
    }
    // #[end]
}



TemplateNode.prototype.nodeType = 7;

TemplateNode.prototype.attach = nodeOwnOnlyChildrenAttach;

/**
 * 销毁释放
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
TemplateNode.prototype.dispose = function (noDetach, noTransition) {
    elementDisposeChildren(this, noDetach, noTransition);

    if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
    }
    nodeDispose(this);
};


TemplateNode.prototype._toPhase = elementOwnToPhase;

/**
 * 视图更新函数
 *
 * @param {Array} changes 数据变化信息
 */
TemplateNode.prototype._update = function (changes) {
    elementUpdateChildren(this, changes);
};

// exports = module.exports = TemplateNode;


/**
 * @file 对元素的子节点进行反解
 * @author errorrik(errorrik@gmail.com)
 */


// var each = require('../util/each');
// var DOMChildrenWalker = require('./dom-children-walker');
// var createReverseNode = require('./create-reverse-node');

// #[begin] reverse

/**
 * 对元素的子节点进行反解
 *
 * @param {Object} element 元素
 */
function reverseElementChildren(element) {
    var htmlDirective = element.aNode.directives.html;

    if (!htmlDirective) {
        var reverseWalker = new DOMChildrenWalker(element.el);

        each(element.aNode.children, function (aNodeChild) {
            element.children.push(createReverseNode(aNodeChild, reverseWalker, element));
        });
    }
}
// #[end]

// exports = module.exports = reverseElementChildren;


/**
 * @file 处理元素的属性操作
 * @author errorrik(errorrik@gmail.com)
 */

// var getPropHandler = require('./get-prop-handler');

/**
 * 处理元素属性操作
 *
 * @param {Object} element 元素对象
 * @param {*} value 属性值
 * @param {Object} prop 属性信息对象
 */
function handleProp(element, value, prop) {
    var name = prop.name;
    getPropHandler(element.tagName, name).prop(element.el, value, name, element, prop);
}

// exports = module.exports = handleProp;


/**
 * @file 创建节点对应的 HTMLElement 主元素
 * @author errorrik(errorrik@gmail.com)
 */


// var evalExpr = require('../runtime/eval-expr');
// var createEl = require('../browser/create-el');
// var handleProp = require('./handle-prop');
// var NodeType = require('./node-type');
// var getPropHandler = require('./get-prop-handler');

var emptyPropWhenCreate = {
    'class': 1,
    'style': 1,
    'id': 1
};

/**
 * 创建节点对应的 HTMLElement 主元素
 */
function elementOwnCreate() {
    if (!this.lifeCycle.created) {
        var isComponent = this.nodeType === 5;
        var sourceNode = this.aNode.hotspot.sourceNode;
        var props = this.aNode.props;

        if (sourceNode) {
            this.el = sourceNode.cloneNode();
            props = this.aNode.hotspot.dynamicProps;
        }
        else {
            this.el = createEl(this.tagName);
        }

        for (var key in this._sbindData) {
            if (this._sbindData.hasOwnProperty(key)) {
                getPropHandler(this.tagName, key).prop(
                    this.el,
                    this._sbindData[key],
                    key,
                    this
                );
            }
        }

        for (var i = 0, l = props.length; i < l; i++) {
            var prop = props[i];
            var value = isComponent
                ? evalExpr(prop.expr, this.data, this)
                : evalExpr(prop.expr, this.scope, this.owner);

            if (value || !emptyPropWhenCreate[prop.name]) {
                handleProp(this, value, prop);
            }
        }

        this._toPhase('created');
    }
}

// exports = module.exports = elementOwnCreate;


/**
 * @file 将元素attach到页面
 * @author errorrik(errorrik@gmail.com)
 */

// var genElementChildren = require('./gen-element-children');
// var evalExpr = require('../runtime/eval-expr');
// var insertBefore = require('../browser/insert-before');

/**
 * 将元素attach到页面
 *
 * @param {Object} element 元素节点
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function elementAttach(element, parentEl, beforeEl) {
    element._create();
    insertBefore(element.el, parentEl, beforeEl);

    if (!element._contentReady) {
        var htmlDirective = element.aNode.directives.html;

        if (htmlDirective) {
            element.el.innerHTML = evalExpr(htmlDirective.value, element.scope, element.owner);
        }
        else {
            genElementChildren(element);
        }

        element._contentReady = 1;
    }
}


// exports = module.exports = elementAttach;


/**
 * @file 将元素attach到页面
 * @author errorrik(errorrik@gmail.com)
 */


// var elementAttach = require('./element-attach');

/**
 * 将元素attach到页面
 *
 * @param {HTMLElement} parentEl 要添加到的父元素
 * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
 */
function elementOwnAttach(parentEl, beforeEl) {
    if (!this.lifeCycle.attached) {
        elementAttach(this, parentEl, beforeEl);
        this._attached();
    }
}

// exports = module.exports = elementOwnAttach;


/**
 * @file 获取 element 的 transition 控制对象
 * @author errorrik(errorrik@gmail.com)
 */

// var evalArgs = require('../runtime/eval-args');
// var findMethod = require('../runtime/find-method');
// var NodeType = require('./node-type');

/**
 * 获取 element 的 transition 控制对象
 *
 * @param {Object} element 元素
 * @return {Object?}
 */
function elementGetTransition(element) {
    var directive = element.aNode.directives.transition;
    var owner = element.owner;

    if (element.nodeType === 5) {
        var cmptGivenTransition = element.givenANode && element.givenANode.directives.transition;
        if (cmptGivenTransition) {
            directive = cmptGivenTransition;
        }
        else {
            owner = element;
        }
    }

    var transition;
    if (directive && owner) {
        transition = findMethod(owner, directive.value.name);

        if (typeof transition === 'function') {
            transition = transition.apply(
                owner,
                evalArgs(directive.value.args, element.scope, owner)
            );
        }
    }

    return transition || element.transition;
}

// exports = module.exports = elementGetTransition;


/**
 * @file 元素节点执行leave行为
 * @author errorrik(errorrik@gmail.com)
 */

// var elementGetTransition = require('./element-get-transition');


/**
 * 元素节点执行leave行为
 *
 * @param {Object} element 元素
 */
function elementLeave(element) {
    var lifeCycle = element.lifeCycle;
    if (lifeCycle.leaving) {
        return;
    }

    if (element.disposeNoTransition) {
        element._doneLeave();
    }
    else {
        var transition = elementGetTransition(element);

        if (transition && transition.leave) {
            element._toPhase('leaving');
            transition.leave(element.el, function () {
                element._doneLeave();
            });
        }
        else {
            element._doneLeave();
        }
    }
}

// exports = module.exports = elementLeave;


/**
 * @file 将元素从页面上移除
 * @author errorrik(errorrik@gmail.com)
 */

// var elementLeave = require('./element-leave');

/**
 * 将元素从页面上移除
 */
function elementOwnDetach() {
    elementLeave(this);
}


// exports = module.exports = elementOwnDetach;


/**
 * @file 销毁释放元素
 * @author errorrik(errorrik@gmail.com)
 */

// var elementLeave = require('./element-leave');

/**
 * 销毁释放元素
 *
 * @param {boolean=} noDetach 是否不要把节点从dom移除
 * @param {boolean=} noTransition 是否不显示过渡动画效果
 */
function elementOwnDispose(noDetach, noTransition) {
    this.leaveDispose = 1;
    this.disposeNoDetach = noDetach;
    this.disposeNoTransition = noTransition;

    elementLeave(this);
}

// exports = module.exports = elementOwnDispose;


/**
 * @file 为元素的 el 绑定事件
 * @author errorrik(errorrik@gmail.com)
 */

// var on = require('../browser/on');

/**
 * 为元素的 el 绑定事件
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {boolean} capture 是否是捕获阶段触发
 */
function elementOwnOnEl(name, listener, capture) {
    if (typeof listener === 'function') {
        capture = !!capture;
        this._elFns.push([name, listener, capture]);
        on(this.el, name, listener, capture);
    }
}

// exports = module.exports = elementOwnOnEl;


/**
 * @file  事件绑定不存在的 warning
 * @author varsha(wangshuonpu@gmail.com)
 */

// var each = require('../util/each');

// #[begin] error
/**
 * 事件绑定不存在的 warning
 *
 * @param {Object} eventBind 事件绑定对象
 * @param {Component} owner 所属的组件对象
 */
function warnEventListenMethod(eventBind, owner) {
    var valid = true;
    var method = owner;
    each(eventBind.expr.name.paths, function (path) {
        if (!path.value) {
            return false;
        }

        method = method[path.value];
        valid = !!method;
        return valid;
    });

    if (!valid) {
        var paths = [];
        each(eventBind.expr.name.paths, function (path) {
            paths.push(path.value);
        });
        var message = '[SAN WARNING] ' + eventBind.name + ' listen fail,"' + paths.join('.') + '" not exist';

        /* eslint-disable no-console */
        if (typeof console === 'object' && console.warn) {
            console.warn(message);
        }
        else {
            throw new Error(message);
        }
        /* eslint-enable no-console */
    }
}
// #[end]

// exports = module.exports = warnEventListenMethod;


/**
 * @file 完成元素 attached 后的行为
 * @author errorrik(errorrik@gmail.com)
 */


// var bind = require('../util/bind');
// var empty = require('../util/empty');
// var isBrowser = require('../browser/is-browser');
// var trigger = require('../browser/trigger');
// var NodeType = require('./node-type');
// var elementGetTransition = require('./element-get-transition');
// var eventDeclarationListener = require('./event-declaration-listener');
// var getPropHandler = require('./get-prop-handler');
// var warnEventListenMethod = require('./warn-event-listen-method');

/**
 * 双绑输入框CompositionEnd事件监听函数
 *
 * @inner
 */
function inputOnCompositionEnd() {
    if (!this.composing) {
        return;
    }

    this.composing = 0;

    trigger(this, 'input');
}

/**
 * 双绑输入框CompositionStart事件监听函数
 *
 * @inner
 */
function inputOnCompositionStart() {
    this.composing = 1;
}

function xPropOutputer(xProp, data) {
    getPropHandler(this.tagName, xProp.name).output(this, xProp, data);
}

function inputXPropOutputer(element, xProp, data) {
    var outputer = bind(xPropOutputer, element, xProp, data);
    return function (e) {
        if (!this.composing) {
            outputer(e);
        }
    };
}

/**
 * 完成元素 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
function elementOwnAttached() {
    this._toPhase('created');

    var isComponent = this.nodeType === 5;
    var data = isComponent ? this.data : this.scope;

    /* eslint-disable no-redeclare */

    // 处理自身变化时双向绑定的逻辑
    var xProps = this.aNode.hotspot.xProps;
    for (var i = 0, l = xProps.length; i < l; i++) {
        var xProp = xProps[i];

        switch (xProp.name) {
            case 'value':
                switch (this.tagName) {
                    case 'input':
                    case 'textarea':
                        if (isBrowser && window.CompositionEvent) {
                            this._onEl('change', inputOnCompositionEnd);
                            this._onEl('compositionstart', inputOnCompositionStart);
                            this._onEl('compositionend', inputOnCompositionEnd);
                        }

                        this._onEl(
                            ('oninput' in this.el) ? 'input' : 'propertychange',
                            inputXPropOutputer(this, xProp, data)
                        );

                        break;

                    case 'select':
                        this._onEl('change', bind(xPropOutputer, this, xProp, data));
                        break;
                }
                break;

            case 'checked':
                switch (this.tagName) {
                    case 'input':
                        switch (this.el.type) {
                            case 'checkbox':
                            case 'radio':
                                this._onEl('click', bind(xPropOutputer, this, xProp, data));
                        }
                }
                break;
        }
    }

    // bind events
    var events = isComponent
        ? this.aNode.events.concat(this.nativeEvents)
        : this.aNode.events;

    for (var i = 0, l = events.length; i < l; i++) {
        var eventBind = events[i];
        var owner = isComponent ? this : this.owner;

        // 判断是否是nativeEvent，下面的warn方法和事件绑定都需要
        // 依此指定eventBind.expr.name位于owner还是owner.owner上
        if (eventBind.modifier.native) {
            owner = owner.owner;
            data = this.scope || owner.data;
        }

        // #[begin] error
        warnEventListenMethod(eventBind, owner);
        // #[end]

        this._onEl(
            eventBind.name,
            bind(
                eventDeclarationListener,
                owner,
                eventBind,
                0,
                data
            ),
            eventBind.modifier.capture
        );
    }

    this._toPhase('attached');


    if (this._isInitFromEl) {
        this._isInitFromEl = false;
    }
    else {
        var transition = elementGetTransition(this);
        if (transition && transition.enter) {
            transition.enter(this.el, empty);
        }
    }
}

// exports = module.exports = elementOwnAttached;


/**
 * @file 销毁元素节点
 * @author errorrik(errorrik@gmail.com)
 */


// var un = require('../browser/un');
// var removeEl = require('../browser/remove-el');
// var elementDisposeChildren = require('./element-dispose-children');
// var nodeDispose = require('./node-dispose');

/**
 * 销毁元素节点
 *
 * @param {Object} element 要销毁的元素节点
 * @param {Object=} options 销毁行为的参数
 */
function elementDispose(element) {
    elementDisposeChildren(element, 1, 1);

    // el 事件解绑
    var len = element._elFns.length;
    while (len--) {
        var fn = element._elFns[len];
        un(element.el, fn[0], fn[1], fn[2]);
    }
    element._elFns = null;


    // 如果没有parent，说明是一个root component，一定要从dom树中remove
    if (!element.disposeNoDetach || !element.parent) {
        removeEl(element.el);
    }

    if (element._toPhase) {
        element._toPhase('detached');
    }

    nodeDispose(element);
}


// exports = module.exports = elementDispose;


/**
 * @file 初始化 element 节点的 tagName 处理
 * @author errorrik(errorrik@gmail.com)
 */

// var ieOldThan9 = require('../browser/ie-old-than-9');

/**
 * 初始化 element 节点的 tagName 处理
 *
 * @param {Object} node 节点对象
 */
function elementInitTagName(node) {
    node.tagName = node.tagName || node.aNode.tagName || 'div';

    // #[begin] allua
    // ie8- 不支持innerHTML输出自定义标签
    if (ieOldThan9 && node.tagName.indexOf('-') > 0) {
        node.tagName = 'div';
    }
    // #[end]
}


// exports = module.exports = elementInitTagName;


/**
 * @file 给 devtool 发通知消息
 * @author errorrik(errorrik@gmail.com)
 */

// var isBrowser = require('../browser/is-browser');

// #[begin] devtool
var san4devtool;

/**
 * 给 devtool 发通知消息
 *
 * @param {string} name 消息名称
 * @param {*} arg 消息参数
 */
function emitDevtool(name, arg) {
    if (isBrowser && san4devtool && san4devtool.debug && window.__san_devtool__) {
        window.__san_devtool__.emit(name, arg);
    }
}

emitDevtool.start = function (main) {
    san4devtool = main;
    emitDevtool('san', main);
};
// #[end]

// exports = module.exports = emitDevtool;


/**
 * @file 组件类
 * @author errorrik(errorrik@gmail.com)
 */

// var bind = require('../util/bind');
// var each = require('../util/each');
// var guid = require('../util/guid');
// var extend = require('../util/extend');
// var nextTick = require('../util/next-tick');
// var emitDevtool = require('../util/emit-devtool');
// var ExprType = require('../parser/expr-type');
// var parseExpr = require('../parser/parse-expr');
// var createAccessor = require('../parser/create-accessor');
// var postProp = require('../parser/post-prop');
// var removeEl = require('../browser/remove-el');
// var Data = require('../runtime/data');
// var evalExpr = require('../runtime/eval-expr');
// var changeExprCompare = require('../runtime/change-expr-compare');
// var DataChangeType = require('../runtime/data-change-type');
// var compileComponent = require('./compile-component');
// var componentPreheat = require('./component-preheat');
// var LifeCycle = require('./life-cycle');
// var getANodeProp = require('./get-a-node-prop');
// var isDataChangeByElement = require('./is-data-change-by-element');
// var eventDeclarationListener = require('./event-declaration-listener');
// var reverseElementChildren = require('./reverse-element-children');
// var camelComponentBinds = require('./camel-component-binds');
// var NodeType = require('./node-type');
// var nodeSBindInit = require('./node-s-bind-init');
// var nodeSBindUpdate = require('./node-s-bind-update');
// var elementInitTagName = require('./element-init-tag-name');
// var elementOwnAttached = require('./element-own-attached');
// var elementDispose = require('./element-dispose');
// var elementUpdateChildren = require('./element-update-children');
// var elementOwnOnEl = require('./element-own-on-el');
// var elementOwnCreate = require('./element-own-create');
// var elementOwnAttach = require('./element-own-attach');
// var elementOwnDetach = require('./element-own-detach');
// var elementOwnDispose = require('./element-own-dispose');
// var warnEventListenMethod = require('./warn-event-listen-method');
// var elementDisposeChildren = require('./element-dispose-children');
// var elementAttach = require('./element-attach');
// var handleProp = require('./handle-prop');
// var createDataTypesChecker = require('../util/create-data-types-checker');




/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
function Component(options) { // eslint-disable-line
    options = options || {};

    this.lifeCycle = LifeCycle.start;
    this.children = [];
    this._elFns = [];
    this.listeners = {};
    this.slotChildren = [];

    var clazz = this.constructor;

    this.filters = this.filters || clazz.filters || {};
    this.computed = this.computed || clazz.computed || {};
    this.messages = this.messages || clazz.messages || {};

    if (options.transition) {
        this.transition = options.transition;
    }

    this.subTag = options.subTag;

    // compile
    compileComponent(clazz);
    componentPreheat(clazz);

    var me = this;
    var protoANode = clazz.prototype.aNode;

    this.givenANode = options.aNode;
    this.givenNamedSlotBinds = [];
    this.givenSlots = {
        named: {}
    };

    this.owner = options.owner;
    this.scope = options.scope;
    this.el = options.el;

    var parent = options.parent;
    if (parent) {
        this.parent = parent;
        this.parentComponent = parent.nodeType === 5
            ? parent
            : parent && parent.parentComponent;
    }

    this.id = guid();

    // #[begin] reverse
    if (this.el) {
        var firstCommentNode = this.el.firstChild;
        if (firstCommentNode && firstCommentNode.nodeType === 3) {
            firstCommentNode = firstCommentNode.nextSibling;
        }

        if (firstCommentNode && firstCommentNode.nodeType === 8) {
            var stumpMatch = firstCommentNode.data.match(/^\s*s-data:([\s\S]+)?$/);
            if (stumpMatch) {
                var stumpText = stumpMatch[1];

                // fill component data
                options.data = (new Function(
                    'return ' + stumpText.replace(/^[\s\n]*/, '')
                ))();

                if (firstCommentNode.previousSibling) {
                    removeEl(firstCommentNode.previousSibling);
                }
                removeEl(firstCommentNode);
            }
        }
    }
    // #[end]

    // native事件数组
    this.nativeEvents = [];

    if (this.givenANode) {
        // 组件运行时传入的结构，做slot解析
        this._createGivenSlots();

        each(this.givenANode.events, function (eventBind) {
            // 保存当前实例的native事件，下面创建aNode时候做合并
            if (eventBind.modifier.native) {
                me.nativeEvents.push(eventBind);
                return;
            }

            // #[begin] error
            warnEventListenMethod(eventBind, options.owner);
            // #[end]

            me.on(
                eventBind.name,
                bind(eventDeclarationListener, options.owner, eventBind, 1, options.scope),
                eventBind
            );
        });

        this.tagName = protoANode.tagName || this.givenANode.tagName;
        this.binds = camelComponentBinds(this.givenANode.props);

        // init s-bind data
        nodeSBindInit(this, this.givenANode.directives.bind);
    }

    this._toPhase('compiled');

    // init data
    this.data = new Data(
        extend(
            typeof this.initData === 'function' && this.initData() || {},
            options.data || this._sbindData
        )
    );

    elementInitTagName(this);

    each(this.binds, function (bind) {
        postProp(bind);

        if (me.scope) {
            var value = evalExpr(bind.expr, me.scope, me.owner);
            if (typeof value !== 'undefined') {
                // See: https://github.com/ecomfe/san/issues/191
                me.data.set(bind.name, value);
            }
        }
    });

    // #[begin] error
    // 在初始化 + 数据绑定后，开始数据校验
    // NOTE: 只在开发版本中进行属性校验
    var dataTypes = this.dataTypes || clazz.dataTypes;
    if (dataTypes) {
        var dataTypeChecker = createDataTypesChecker(
            dataTypes,
            this.subTag || this.name || clazz.name
        );
        this.data.setTypeChecker(dataTypeChecker);
        this.data.checkDataTypes();
    }
    // #[end]

    this.computedDeps = {};
    for (var expr in this.computed) {
        if (this.computed.hasOwnProperty(expr) && !this.computedDeps[expr]) {
            this._calcComputed(expr);
        }
    }

    if (!this.dataChanger) {
        this.dataChanger = bind(this._dataChanger, this);
        this.data.listen(this.dataChanger);
    }
    this._toPhase('inited');

    // #[begin] reverse
    if (this.el) {
        reverseElementChildren(this);
        this._attached();
    }

    var walker = options.reverseWalker;
    if (walker) {
        var currentNode = walker.current;
        if (currentNode && currentNode.nodeType === 1) {
            this.el = currentNode;
            walker.goNext();
        }

        reverseElementChildren(this);

        this._attached();
    }
    // #[end]
}


/**
 * 初始化创建组件外部传入的插槽对象
 *
 * @protected
 */
Component.prototype._createGivenSlots = function () {
    var me = this;
    this.givenSlots.named = {};

    // 组件运行时传入的结构，做slot解析
    this.givenANode && this.scope && each(this.givenANode.children, function (child) {
        var target;

        var slotBind = !child.textExpr && getANodeProp(child, 'slot');
        if (slotBind) {
            !me.givenSlotInited && me.givenNamedSlotBinds.push(slotBind);

            var slotName = evalExpr(slotBind.expr, me.scope, me.owner);
            target = me.givenSlots.named[slotName];
            if (!target) {
                target = me.givenSlots.named[slotName] = [];
            }
        }
        else if (!me.givenSlotInited) {
            target = me.givenSlots.noname;
            if (!target) {
                target = me.givenSlots.noname = [];
            }
        }

        target && target.push(child);
    });

    this.givenSlotInited = true;
};

/**
 * 类型标识
 *
 * @type {string}
 */
Component.prototype.nodeType = 5;

/**
 * 在下一个更新周期运行函数
 *
 * @param {Function} fn 要运行的函数
 */
Component.prototype.nextTick = nextTick;

/* eslint-disable operator-linebreak */
/**
 * 使节点到达相应的生命周期
 *
 * @protected
 * @param {string} name 生命周期名称
 */
Component.prototype._callHook =
Component.prototype._toPhase = function (name) {
    if (!this.lifeCycle[name]) {
        this.lifeCycle = LifeCycle[name] || this.lifeCycle;
        if (typeof this[name] === 'function') {
            this[name]();
        }
        this['_after' + name] = 1;

        // 通知devtool
        // #[begin] devtool
        emitDevtool('comp-' + name, this);
        // #[end]
    }
};
/* eslint-enable operator-linebreak */


/**
 * 添加事件监听器
 *
 * @param {string} name 事件名
 * @param {Function} listener 监听器
 * @param {string?} declaration 声明式
 */
Component.prototype.on = function (name, listener, declaration) {
    if (typeof listener === 'function') {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push({fn: listener, declaration: declaration});
    }
};

/**
 * 移除事件监听器
 *
 * @param {string} name 事件名
 * @param {Function=} listener 监听器
 */
Component.prototype.un = function (name, listener) {
    var nameListeners = this.listeners[name];
    var len = nameListeners && nameListeners.length;

    while (len--) {
        if (!listener || listener === nameListeners[len].fn) {
            nameListeners.splice(len, 1);
        }
    }
};


/**
 * 派发事件
 *
 * @param {string} name 事件名
 * @param {Object} event 事件对象
 */
Component.prototype.fire = function (name, event) {
    var me = this;
    each(this.listeners[name], function (listener) {
        listener.fn.call(me, event);
    });
};

/**
 * 计算 computed 属性的值
 *
 * @private
 * @param {string} computedExpr computed表达式串
 */
Component.prototype._calcComputed = function (computedExpr) {
    var computedDeps = this.computedDeps[computedExpr];
    if (!computedDeps) {
        computedDeps = this.computedDeps[computedExpr] = {};
    }

    this.data.set(computedExpr, this.computed[computedExpr].call({
        data: {
            get: bind(function (expr) {
                // #[begin] error
                if (!expr) {
                    throw new Error('[SAN ERROR] call get method in computed need argument');
                }
                // #[end]

                if (!computedDeps[expr]) {
                    computedDeps[expr] = 1;

                    if (this.computed[expr]) {
                        this._calcComputed(expr);
                    }

                    this.watch(expr, function () {
                        this._calcComputed(computedExpr);
                    });
                }

                return this.data.get(expr);
            }, this)
        }
    }));
};

/**
 * 派发消息
 * 组件可以派发消息，消息将沿着组件树向上传递，直到遇上第一个处理消息的组件
 *
 * @param {string} name 消息名称
 * @param {*?} value 消息值
 */
Component.prototype.dispatch = function (name, value) {
    var parentComponent = this.parentComponent;

    while (parentComponent) {
        var receiver = parentComponent.messages[name] || parentComponent.messages['*'];
        if (typeof receiver === 'function') {
            receiver.call(
                parentComponent,
                {target: this, value: value, name: name}
            );
            break;
        }

        parentComponent = parentComponent.parentComponent;
    }
};

/**
 * 获取组件内部的 slot
 *
 * @param {string=} name slot名称，空为default slot
 * @return {Array}
 */
Component.prototype.slot = function (name) {
    var result = [];
    var me = this;

    function childrenTraversal(children) {
        each(children, function (child) {
            if (child.nodeType === 6 && child.owner === me) {
                if (child.isNamed && child.name === name
                    || !child.isNamed && !name
                ) {
                    result.push(child);
                }
            }
            else {
                childrenTraversal(child.children);
            }
        });
    }

    childrenTraversal(this.children);
    return result;
};

/**
 * 获取带有 san-ref 指令的子组件引用
 *
 * @param {string} name 子组件的引用名
 * @return {Component}
 */
Component.prototype.ref = function (name) {
    var refTarget;
    var owner = this;

    function childrenTraversal(children) {
        each(children, function (child) {
            elementTraversal(child);
            return !refTarget;
        });
    }

    function elementTraversal(element) {
        var nodeType = element.nodeType;
        if (nodeType === 1) {
            return;
        }

        if (element.owner === owner) {
            var ref;
            switch (element.nodeType) {
                case 4:
                    ref = element.aNode.directives.ref;
                    if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                        refTarget = element.el;
                    }
                    break;

                case 5:
                    ref = element.givenANode.directives.ref;
                    if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                        refTarget = element;
                    }
            }

            !refTarget && childrenTraversal(element.slotChildren);
        }

        !refTarget && childrenTraversal(element.children);
    }

    childrenTraversal(this.children);

    return refTarget;
};


/**
 * 视图更新函数
 *
 * @param {Array?} changes 数据变化信息
 */
Component.prototype._update = function (changes) {
    if (this.lifeCycle.disposed) {
        return;
    }

    var me = this;


    var needReloadForSlot = false;
    this._notifyNeedReload = function () {
        needReloadForSlot = true;
    };

    if (changes) {
        this.givenANode && nodeSBindUpdate(
            this,
            this.givenANode.directives.bind,
            changes,
            function (name, value) {
                if (name in me.givenANode.hotspot.props) {
                    return;
                }

                me.data.set(name, value, {
                    target: {
                        id: me.owner.id
                    }
                });
            }
        );


        each(changes, function (change) {
            var changeExpr = change.expr;

            each(me.binds, function (bindItem) {
                var relation;
                var setExpr = bindItem.name;
                var updateExpr = bindItem.expr;

                if (!isDataChangeByElement(change, me, setExpr)
                    && (relation = changeExprCompare(changeExpr, updateExpr, me.scope))
                ) {
                    if (relation > 2) {
                        setExpr = createAccessor(
                            [
                                {
                                    type: 1,
                                    value: setExpr
                                }
                            ].concat(changeExpr.paths.slice(updateExpr.paths.length))
                        );
                        updateExpr = changeExpr;
                    }

                    if (relation >= 2 && change.type === 2) {
                        me.data.splice(setExpr, [change.index, change.deleteCount].concat(change.insertions), {
                            target: {
                                id: me.owner.id
                            }
                        });
                    }
                    else {
                        me.data.set(setExpr, evalExpr(updateExpr, me.scope, me.owner), {
                            target: {
                                id: me.owner.id
                            }
                        });
                    }
                }
            });

            each(me.givenNamedSlotBinds, function (bindItem) {
                needReloadForSlot = needReloadForSlot || changeExprCompare(changeExpr, bindItem.expr, me.scope);
                return !needReloadForSlot;
            });
        });

        if (needReloadForSlot) {
            this._createGivenSlots();
            this._repaintChildren();
        }
        else {
            var slotChildrenLen = this.slotChildren.length;
            while (slotChildrenLen--) {
                var slotChild = this.slotChildren[slotChildrenLen];

                if (slotChild.lifeCycle.disposed) {
                    this.slotChildren.splice(slotChildrenLen, 1);
                }
                else if (slotChild.isInserted) {
                    slotChild._update(changes, 1);
                }
            }
        }
    }

    var dataChanges = this.dataChanges;
    if (dataChanges) {
        this.dataChanges = null;
        each(this.aNode.hotspot.dynamicProps, function (prop) {
            each(dataChanges, function (change) {
                if (changeExprCompare(change.expr, prop.expr, me.data)
                    || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, me.data)
                ) {
                    handleProp(me, evalExpr(prop.expr, me.data, me), prop);
                    return false;
                }
            });
        });

        elementUpdateChildren(this, dataChanges);
        if (needReloadForSlot) {
            this._createGivenSlots();
            this._repaintChildren();
        }

        this._toPhase('updated');

        if (this.owner) {
            this._updateBindxOwner(dataChanges);
            this.owner._update();
        }
    }

    this._notifyNeedReload = null;
};

Component.prototype._updateBindxOwner = function (dataChanges) {
    var me = this;
    each(dataChanges, function (change) {
        each(me.binds, function (bindItem) {
            var changeExpr = change.expr;
            if (bindItem.x
                && !isDataChangeByElement(change, me.owner)
                && changeExprCompare(changeExpr, parseExpr(bindItem.name), me.data)
            ) {
                var updateScopeExpr = bindItem.expr;
                if (changeExpr.paths.length > 1) {
                    updateScopeExpr = createAccessor(
                        bindItem.expr.paths.concat(changeExpr.paths.slice(1))
                    );
                }

                me.scope.set(
                    updateScopeExpr,
                    evalExpr(changeExpr, me.data, me),
                    {
                        target: {
                            id: me.id,
                            prop: bindItem.name
                        }
                    }
                );
            }
        });
    });
};

/**
 * 重新绘制组件的内容
 * 当 dynamic slot name 发生变更或 slot 匹配发生变化时，重新绘制
 * 在组件级别重绘有点粗暴，但是能保证视图结果正确性
 */
Component.prototype._repaintChildren = function () {
    elementDisposeChildren(this, 0, 1);
    this.children = [];

    this._contentReady = 0;
    this.slotChildren = [];
    elementAttach(this);
};


/**
 * 组件内部监听数据变化的函数
 *
 * @private
 * @param {Object} change 数据变化信息
 */
Component.prototype._dataChanger = function (change) {
    if (this.lifeCycle.created && this._aftercreated) {
        if (!this.dataChanges) {
            nextTick(this._update, this);
            this.dataChanges = [];
        }

        this.dataChanges.push(change);
    }
    else if (this.lifeCycle.inited && this.owner) {
        this._updateBindxOwner([change]);
    }
};


/**
 * 监听组件的数据变化
 *
 * @param {string} dataName 变化的数据项
 * @param {Function} listener 监听函数
 */
Component.prototype.watch = function (dataName, listener) {
    var dataExpr = parseExpr(dataName);

    this.data.listen(bind(function (change) {
        if (changeExprCompare(change.expr, dataExpr, this.data)) {
            listener.call(this, evalExpr(dataExpr, this.data, this), change);
        }
    }, this));
};

/**
 * 组件销毁的行为
 *
 * @param {Object} options 销毁行为的参数
 */
Component.prototype.dispose = elementOwnDispose;

Component.prototype._doneLeave = function () {
    if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
            // 这里不用挨个调用 dispose 了，因为 children 释放链会调用的
            this.slotChildren = null;

            this.data.unlisten();
            this.dataChanger = null;
            this.dataChanges = null;

            elementDispose(
                this,
                this.disposeNoDetach,
                this.disposeNoTransition
            );
            this.listeners = null;

            this.givenANode = null;
            this.givenSlots = null;
            this.givenNamedSlotBinds = null;
        }
    }
    else if (this.lifeCycle.attached) {
        removeEl(this.el);
        this._toPhase('detached');
    }
};

/**
 * 完成组件 attached 后的行为
 *
 * @param {Object} element 元素节点
 */
Component.prototype._attached = elementOwnAttached;

Component.prototype.attach = elementOwnAttach;
Component.prototype.detach = elementOwnDetach;
Component.prototype._create = elementOwnCreate;
Component.prototype._onEl = elementOwnOnEl;


// exports = module.exports = Component;


/**
 * @file 创建组件类
 * @author errorrik(errorrik@gmail.com)
 */

// var Component = require('./component');
// var inherits = require('../util/inherits');

/**
 * 创建组件类
 *
 * @param {Object} proto 组件类的方法表
 * @param {Function=} SuperComponent 父组件类
 * @return {Function}
 */
function defineComponent(proto, SuperComponent) {
    // 如果传入一个不是 san component 的 constructor，直接返回不是组件构造函数
    // 这种场景导致的错误 san 不予考虑
    if (typeof proto === 'function') {
        return proto;
    }

    // #[begin] error
    if (typeof proto !== 'object') {
        throw new Error('[SAN FATAL] param must be a plain object.');
    }
    // #[end]

    function ComponentClass(option) { // eslint-disable-line
        Component.call(this, option);
    }

    ComponentClass.prototype = proto;
    inherits(ComponentClass, SuperComponent || Component);

    return ComponentClass;
}

// exports = module.exports = defineComponent;


/**
 * @file 编译组件类
 * @author errorrik(errorrik@gmail.com)
 */


// var createANode = require('../parser/create-a-node');
// var parseTemplate = require('../parser/parse-template');
// var parseText = require('../parser/parse-text');
// var defineComponent = require('./define-component');


/**
 * 编译组件类。预解析template和components
 *
 * @param {Function} ComponentClass 组件类
 */
function compileComponent(ComponentClass) {
    var proto = ComponentClass.prototype;

    // pre define components class
    if (!proto.hasOwnProperty('_cmptReady')) {
        proto.components = ComponentClass.components || proto.components || {};
        var components = proto.components;

        for (var key in components) { // eslint-disable-line
            var componentClass = components[key];

            if (typeof componentClass === 'object') {
                components[key] = defineComponent(componentClass);
            }
            else if (componentClass === 'self') {
                components[key] = ComponentClass;
            }
        }

        proto._cmptReady = 1;
    }


    // pre compile template
    if (!proto.hasOwnProperty('aNode')) {
        proto.aNode = createANode();

        var tpl = ComponentClass.template || proto.template;
        if (tpl) {
            var aNode = parseTemplate(tpl, {
                trimWhitespace: proto.trimWhitespace || ComponentClass.trimWhitespace,
                delimiters: proto.delimiters || ComponentClass.delimiters
            });
            var firstChild = aNode.children[0];

            // #[begin] error
            if (aNode.children.length !== 1 || firstChild.textExpr) {
                throw new Error('[SAN FATAL] template must have a root element.');
            }
            // #[end]

            proto.aNode = firstChild;
            if (firstChild.tagName === 'template') {
                firstChild.tagName = null;
            }

            var componentPropExtra = {
                'class': {name: 'class', expr: parseText('{{class | _class | _sep(" ")}}')},
                'style': {name: 'style', expr: parseText('{{style | _style | _sep(";")}}')},
                'id': {name: 'id', expr: parseText('{{id}}')}
            };

            var len = firstChild.props.length;
            while (len--) {
                var prop = firstChild.props[len];
                var extra = componentPropExtra[prop.name];

                if (extra) {
                    firstChild.props.splice(len, 1);
                    componentPropExtra[prop.name] = prop;

                    if (prop.name !== 'id') {
                        prop.expr.segs.push(extra.expr.segs[0]);
                        prop.expr.value = null;
                    }
                }
            }

            firstChild.props.push(
                componentPropExtra['class'], // eslint-disable-line dot-notation
                componentPropExtra.style,
                componentPropExtra.id
            );
        }
    }
}

// exports = module.exports = compileComponent;


/**
 * @file 组件预热
 * @author errorrik(errorrik@gmail.com)
 */

// var ExprType = require('../parser/expr-type');
// var each = require('../util/each');
// var createEl = require('../browser/create-el');
// var getPropHandler = require('./get-prop-handler');
// var getANodeProp = require('./get-a-node-prop');
// var isBrowser = require('../browser/is-browser');

/**
 * 组件预热，分析组件aNode的数据引用等信息
 *
 * @param {Function} ComponentClass 组件类
 */
function componentPreheat(ComponentClass) {
    var stack = [];

    function recordHotspotData(refs, notContentData) {
        var len = stack.length;
        each(stack, function (aNode, index) {
            if (!notContentData || index !== len - 1) {
                each(refs, function (ref) {
                    aNode.hotspot.data[ref] = 1;
                });
            }
        });
    }


    function analyseANodeHotspot(aNode) {
        if (!aNode.hotspot) {
            stack.push(aNode);


            if (aNode.textExpr) {
                aNode.hotspot = {data: {}};
                recordHotspotData(analyseExprDataHotspot(aNode.textExpr));
            }
            else {
                var sourceNode;
                if (isBrowser && aNode.tagName
                    && !/^(template|slot|select|input|option|button)$/i.test(aNode.tagName)
                ) {
                    sourceNode = createEl(aNode.tagName);
                }

                aNode.hotspot = {
                    data: {},
                    dynamicProps: [],
                    xProps: [],
                    props: {},
                    sourceNode: sourceNode
                };


                // === analyse hotspot data: start
                each(aNode.vars, function (varItem) {
                    recordHotspotData(analyseExprDataHotspot(varItem.expr));
                });

                each(aNode.props, function (prop) {
                    recordHotspotData(analyseExprDataHotspot(prop.expr));
                });

                for (var key in aNode.directives) {
                    if (aNode.directives.hasOwnProperty(key)) {
                        var directive = aNode.directives[key];
                        recordHotspotData(
                            analyseExprDataHotspot(directive.value),
                            !/^(html|bind)$/.test(key)
                        );

                        // init trackBy getKey function
                        if (key === 'for') {
                            var trackBy = directive.trackBy;
                            if (trackBy
                                && trackBy.type === 4
                                && trackBy.paths[0].value === directive.item.raw
                            ) {
                                aNode.hotspot.getForKey = new Function(
                                    directive.item.raw,
                                    'return ' + trackBy.raw
                                );
                            }
                        }
                    }
                }

                each(aNode.elses, function (child) {
                    analyseANodeHotspot(child);
                });

                each(aNode.children, function (child) {
                    analyseANodeHotspot(child);
                });
                // === analyse hotspot data: end


                // === analyse hotspot props: start
                each(aNode.props, function (prop, index) {
                    aNode.hotspot.props[prop.name] = index;

                    if (prop.name === 'id') {
                        prop.id = true;
                        aNode.hotspot.idProp = prop;
                        aNode.hotspot.dynamicProps.push(prop);
                    }
                    else if (prop.expr.value != null) {
                        if (sourceNode) {
                            getPropHandler(aNode.tagName, prop.name)
                                .prop(sourceNode, prop.expr.value, prop.name, aNode);
                        }
                    }
                    else {
                        if (prop.x) {
                            aNode.hotspot.xProps.push(prop);
                        }
                        aNode.hotspot.dynamicProps.push(prop);
                    }
                });

                // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
                // 所以没有设置 value 时，默认把 option 的内容作为 value
                if (aNode.tagName === 'option'
                    && !getANodeProp(aNode, 'value')
                    && aNode.children[0]
                ) {
                    var valueProp = {
                        name: 'value',
                        expr: aNode.children[0].textExpr
                    };
                    aNode.props.push(valueProp);
                    aNode.hotspot.dynamicProps.push(valueProp);
                    aNode.hotspot.props.value = aNode.props.length - 1;
                }
                // === analyse hotspot props: end
            }

            stack.pop();
        }
    }

    analyseANodeHotspot(ComponentClass.prototype.aNode);
}

/**
 * 分析表达式的数据引用
 *
 * @param {Object} expr 要分析的表达式
 * @return {Array}
 */
function analyseExprDataHotspot(expr) {
    var refs = [];

    function analyseExprs(exprs) {
        each(exprs, function (expr) {
            refs = refs.concat(analyseExprDataHotspot(expr));
        });
    }

    switch (expr.type) {
        case 4:
            var paths = expr.paths;
            refs.push(paths[0].value);

            if (paths.length > 1) {
                refs.push(paths[0].value + '.' + (paths[1].value || '*'));
            }

            analyseExprs(paths.slice(1));
            break;

        case 9:
            return analyseExprDataHotspot(expr.expr);

        case 7:
        case 8:
        case 10:
            analyseExprs(expr.segs);
            break;

        case 5:
            refs = analyseExprDataHotspot(expr.expr);

            each(expr.filters, function (filter) {
                analyseExprs(filter.name.paths);
                analyseExprs(filter.args);
            });

            break;

    }

    return refs;
}

// exports = module.exports = componentPreheat;


/**
 * @file 将 binds 的 name 从 kebabcase 转换成 camelcase
 * @author errorrik(errorrik@gmail.com)
 */

// var kebab2camel = require('../util/kebab2camel');
// var each = require('../util/each');

/**
 * 将 binds 的 name 从 kebabcase 转换成 camelcase
 *
 * @param {Array} binds binds集合
 * @return {Array}
 */
function camelComponentBinds(binds) {
    var result = [];
    each(binds, function (bind) {
        result.push({
            name: kebab2camel(bind.name),
            expr: bind.expr,
            x: bind.x,
            raw: bind.raw
        });
    });

    return result;
}

// exports = module.exports = camelComponentBinds;


/**
 * @file 编译源码的 helper 方法集合
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var ExprType = require('../parser/expr-type');

// #[begin] ssr
// 
// /**
//  * 编译源码的 helper 方法集合对象
//  */
// var compileExprSource = {
// 
//     /**
//      * 字符串字面化
//      *
//      * @param {string} source 需要字面化的字符串
//      * @return {string} 字符串字面化结果
//      */
//     stringLiteralize: function (source) {
//         return '"'
//             + source
//                 .replace(/\x5C/g, '\\\\')
//                 .replace(/"/g, '\\"')
//                 .replace(/\x0A/g, '\\n')
//                 .replace(/\x09/g, '\\t')
//                 .replace(/\x0D/g, '\\r')
//                 // .replace( /\x08/g, '\\b' )
//                 // .replace( /\x0C/g, '\\f' )
//             + '"';
//     },
// 
//     /**
//      * 生成数据访问表达式代码
//      *
//      * @param {Object?} accessorExpr accessor表达式对象
//      * @return {string}
//      */
//     dataAccess: function (accessorExpr) {
//         var code = 'componentCtx.data';
//         if (accessorExpr) {
//             each(accessorExpr.paths, function (path) {
//                 if (path.type === 4) {
//                     code += '[' + compileExprSource.dataAccess(path) + ']';
//                     return;
//                 }
// 
//                 switch (typeof path.value) {
//                     case 'string':
//                         code += '.' + path.value;
//                         break;
// 
//                     case 'number':
//                         code += '[' + path.value + ']';
//                         break;
//                 }
//             });
//         }
// 
//         return code;
//     },
// 
//     /**
//      * 生成调用表达式代码
//      *
//      * @param {Object?} callExpr 调用表达式对象
//      * @return {string}
//      */
//     callExpr: function (callExpr) {
//         var paths = callExpr.name.paths;
//         var code = 'componentCtx.' + paths[0].value;
// 
//         for (var i = 1; i < paths.length; i++) {
//             var path = paths[i];
// 
//             switch (path.type) {
//                 case 1:
//                     code += '.' + path.value;
//                     break;
// 
//                 case 2:
//                     code += '[' + path.value + ']';
//                     break;
// 
//                 default:
//                     code += '[' + compileExprSource.expr(path) + ']';
//             }
//         }
// 
//         code += '(';
//         each(callExpr.args, function (arg, index) {
//             code += (index > 0 ? ', ' : '') + compileExprSource.expr(arg);
//         });
//         code += ')';
// 
//         return code;
//     },
// 
//     /**
//      * 生成插值代码
//      *
//      * @param {Object} interpExpr 插值表达式对象
//      * @return {string}
//      */
//     interp: function (interpExpr) {
//         var code = compileExprSource.expr(interpExpr.expr);
// 
// 
//         each(interpExpr.filters, function (filter) {
//             code = 'componentCtx.callFilter("' + filter.name.paths[0].value + '", [' + code;
//             each(filter.args, function (arg) {
//                 code += ', ' + compileExprSource.expr(arg);
//             });
//             code += '])';
//         });
// 
//         if (!interpExpr.original) {
//             return 'escapeHTML(' + code + ')';
//         }
// 
//         return code;
//     },
// 
//     /**
//      * 生成文本片段代码
//      *
//      * @param {Object} textExpr 文本片段表达式对象
//      * @return {string}
//      */
//     text: function (textExpr) {
//         if (textExpr.segs.length === 0) {
//             return '""';
//         }
// 
//         var code = '';
// 
//         each(textExpr.segs, function (seg) {
//             var segCode = compileExprSource.expr(seg);
//             code += code ? ' + ' + segCode : segCode;
//         });
// 
//         return code;
//     },
// 
//     /**
//      * 生成数组字面量代码
//      *
//      * @param {Object} arrayExpr 数组字面量表达式对象
//      * @return {string}
//      */
//     array: function (arrayExpr) {
//         var code = [];
// 
//         each(arrayExpr.items, function (item) {
//             code.push((item.spread ? '...' : '') + compileExprSource.expr(item.expr));
//         });
// 
//         return '[\n' + code.join(',\n') + '\n]';
//     },
// 
//     /**
//      * 生成对象字面量代码
//      *
//      * @param {Object} objExpr 对象字面量表达式对象
//      * @return {string}
//      */
//     object: function (objExpr) {
//         var code = [];
// 
//         each(objExpr.items, function (item) {
//             if (item.spread) {
//                 code.push('...' + compileExprSource.expr(item.expr));
//             }
//             else {
//                 code.push(compileExprSource.expr(item.name) + ':' + compileExprSource.expr(item.expr));
//             }
//         });
// 
//         return '{\n' + code.join(',\n') + '\n}';
//     },
// 
//     /**
//      * 二元表达式操作符映射表
//      *
//      * @type {Object}
//      */
//     binaryOp: {
//         /* eslint-disable */
//         43: '+',
//         45: '-',
//         42: '*',
//         47: '/',
//         60: '<',
//         62: '>',
//         76: '&&',
//         94: '!=',
//         121: '<=',
//         122: '==',
//         123: '>=',
//         155: '!==',
//         183: '===',
//         248: '||'
//         /* eslint-enable */
//     },
// 
//     /**
//      * 生成表达式代码
//      *
//      * @param {Object} expr 表达式对象
//      * @return {string}
//      */
//     expr: function (expr) {
//         if (expr.parenthesized) {
//             return '(' + compileExprSource._expr(expr) + ')';
//         }
// 
//         return compileExprSource._expr(expr);
//     },
// 
//     /**
//      * 根据表达式类型进行生成代码函数的中转分发
//      *
//      * @param {Object} expr 表达式对象
//      * @return {string}
//      */
//     _expr: function (expr) {
//         switch (expr.type) {
//             case 9:
//                 switch (expr.operator) {
//                     case 33:
//                         return '!' + compileExprSource.expr(expr.expr);
//                     case 45:
//                         return '-' + compileExprSource.expr(expr.expr);
//                 }
// 
//             case 8:
//                 return compileExprSource.expr(expr.segs[0])
//                     + compileExprSource.binaryOp[expr.operator]
//                     + compileExprSource.expr(expr.segs[1]);
// 
//             case 10:
//                 return compileExprSource.expr(expr.segs[0])
//                     + '?' + compileExprSource.expr(expr.segs[1])
//                     + ':' + compileExprSource.expr(expr.segs[2]);
// 
//             case 1:
//                 return compileExprSource.stringLiteralize(expr.literal || expr.value);
// 
//             case 2:
//                 return expr.value;
// 
//             case 3:
//                 return expr.value ? 'true' : 'false';
// 
//             case 4:
//                 return compileExprSource.dataAccess(expr);
// 
//             case 5:
//                 return compileExprSource.interp(expr);
// 
//             case 7:
//                 return compileExprSource.text(expr);
// 
//             case 12:
//                 return compileExprSource.array(expr);
// 
//             case 11:
//                 return compileExprSource.object(expr);
// 
//             case 6:
//                 return compileExprSource.callExpr(expr);
//         }
//     }
// };
// #[end]

// exports = module.exports = compileExprSource;


/**
 * @file 编译源码的中间buffer类
 * @author errorrik(errorrik@gmail.com)
 */

// var each = require('../util/each');
// var compileExprSource = require('./compile-expr-source');


// #[begin] ssr
// /**
//  * 编译源码的中间buffer类
//  *
//  * @class
//  */
// function CompileSourceBuffer() {
//     this.segs = [];
// }
// 
// /**
//  * 添加原始代码，将原封不动输出
//  *
//  * @param {string} code 原始代码
//  */
// CompileSourceBuffer.prototype.addRaw = function (code) {
//     this.segs.push({
//         type: 'RAW',
//         code: code
//     });
// };
// 
// /**
//  * 添加被拼接为html的原始代码
//  *
//  * @param {string} code 原始代码
//  */
// CompileSourceBuffer.prototype.joinRaw = function (code) {
//     this.segs.push({
//         type: 'JOIN_RAW',
//         code: code
//     });
// };
// 
// /**
//  * 添加renderer方法的起始源码
//  */
// CompileSourceBuffer.prototype.addRendererStart = function () {
//     this.addRaw('function (data, parentCtx, givenSlots) {');
//     this.addRaw('var html = "";');
// };
// 
// /**
//  * 添加renderer方法的结束源码
//  */
// CompileSourceBuffer.prototype.addRendererEnd = function () {
//     this.addRaw('return html;');
//     this.addRaw('}');
// };
// 
// /**
//  * 添加被拼接为html的静态字符串
//  *
//  * @param {string} str 被拼接的字符串
//  */
// CompileSourceBuffer.prototype.joinString = function (str) {
//     this.segs.push({
//         str: str,
//         type: 'JOIN_STRING'
//     });
// };
// 
// /**
//  * 添加被拼接为html的数据访问
//  *
//  * @param {Object?} accessor 数据访问表达式对象
//  */
// CompileSourceBuffer.prototype.joinDataStringify = function () {
//     this.segs.push({
//         type: 'JOIN_DATA_STRINGIFY'
//     });
// };
// 
// /**
//  * 添加被拼接为html的表达式
//  *
//  * @param {Object} expr 表达式对象
//  */
// CompileSourceBuffer.prototype.joinExpr = function (expr) {
//     this.segs.push({
//         expr: expr,
//         type: 'JOIN_EXPR'
//     });
// };
// 
// /**
//  * 生成编译后代码
//  *
//  * @return {string}
//  */
// CompileSourceBuffer.prototype.toCode = function () {
//     var code = [];
//     var temp = '';
// 
//     function genStrLiteral() {
//         if (temp) {
//             code.push('html += ' + compileExprSource.stringLiteralize(temp) + ';');
//         }
// 
//         temp = '';
//     }
// 
//     each(this.segs, function (seg) {
//         if (seg.type === 'JOIN_STRING') {
//             temp += seg.str;
//             return;
//         }
// 
//         genStrLiteral();
//         switch (seg.type) {
//             case 'JOIN_DATA_STRINGIFY':
//                 code.push('html += stringifier.any(' + compileExprSource.dataAccess() + ');');
//                 break;
// 
//             case 'JOIN_EXPR':
//                 code.push('html += ' + compileExprSource.expr(seg.expr) + ';');
//                 break;
// 
//             case 'JOIN_RAW':
//                 code.push('html += ' + seg.code + ';');
//                 break;
// 
//             case 'RAW':
//                 code.push(seg.code);
//                 break;
// 
//         }
//     });
// 
//     genStrLiteral();
// 
//     return code.join('\n');
// };
// 
// #[end]

// exports = module.exports = CompileSourceBuffer;


/**
 * @file 将组件编译成 render 方法的 js 源码
 * @author errorrik(errorrik@gmail.com)
 */


// var each = require('../util/each');
// var guid = require('../util/guid');
// var splitStr2Obj = require('../util/split-str-2-obj');
// var parseExpr = require('../parser/parse-expr');
// var createANode = require('../parser/create-a-node');
// var cloneDirectives = require('../parser/clone-directives');
// var autoCloseTags = require('../browser/auto-close-tags');
// var CompileSourceBuffer = require('./compile-source-buffer');
// var compileExprSource = require('./compile-expr-source');
// var rinseCondANode = require('./rinse-cond-anode');
// var getANodeProp = require('./get-a-node-prop');

// #[begin] ssr
// 
// /**
//  * 生成序列化时起始桩的html
//  *
//  * @param {string} type 桩类型标识
//  * @param {string?} content 桩内的内容
//  * @return {string}
//  */
// function serializeStump(type, content) {
//     return '<!--s-' + type + (content ? ':' + content : '') + '-->';
// }
// 
// /**
//  * 生成序列化时结束桩的html
//  *
//  * @param {string} type 桩类型标识
//  * @return {string}
//  */
// function serializeStumpEnd(type) {
//     return '<!--/s-' + type + '-->';
// }
// 
// /**
//  * element 的编译方法集合对象
//  *
//  * @inner
//  */
// var elementSourceCompiler = {
// 
//     /* eslint-disable max-params */
//     /**
//      * 编译元素标签头
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {string} tagName 标签名
//      * @param {Array} props 属性列表
//      * @param {string=} extraProp 额外的属性串
//      * @param {Object=} bindDirective bind指令对象
//      */
//     tagStart: function (sourceBuffer, tagName, props, extraProp, bindDirective) {
//         sourceBuffer.joinString('<' + tagName);
//         sourceBuffer.joinString(extraProp || '');
// 
//         // index list
//         var propsIndex = {};
//         each(props, function (prop) {
//             propsIndex[prop.name] = prop;
//         });
// 
//         each(props, function (prop) {
//             if (prop.name === 'slot') {
//                 return;
//             }
// 
//             if (prop.name === 'value') {
//                 switch (tagName) {
//                     case 'textarea':
//                         return;
// 
//                     case 'select':
//                         sourceBuffer.addRaw('$selectValue = '
//                             + compileExprSource.expr(prop.expr)
//                             + ' || "";'
//                         );
//                         return;
// 
//                     case 'option':
//                         sourceBuffer.addRaw('$optionValue = '
//                             + compileExprSource.expr(prop.expr)
//                             + ';'
//                         );
//                         // value
//                         sourceBuffer.addRaw('if ($optionValue != null) {');
//                         sourceBuffer.joinRaw('" value=\\"" + $optionValue + "\\""');
//                         sourceBuffer.addRaw('}');
// 
//                         // selected
//                         sourceBuffer.addRaw('if ($optionValue === $selectValue) {');
//                         sourceBuffer.joinString(' selected');
//                         sourceBuffer.addRaw('}');
//                         return;
//                 }
//             }
// 
//             switch (prop.name) {
//                 case 'readonly':
//                 case 'disabled':
//                 case 'multiple':
//                     if (prop.raw === '') {
//                         sourceBuffer.joinString(' ' + prop.name);
//                     }
//                     else {
//                         sourceBuffer.joinRaw('boolAttrFilter("' + prop.name + '", '
//                             + compileExprSource.expr(prop.expr)
//                             + ')'
//                         );
//                     }
//                     break;
// 
//                 case 'checked':
//                     if (tagName === 'input') {
//                         var valueProp = propsIndex.value;
//                         var valueCode = compileExprSource.expr(valueProp.expr);
// 
//                         if (valueProp) {
//                             switch (propsIndex.type.raw) {
//                                 case 'checkbox':
//                                     sourceBuffer.addRaw('if (contains('
//                                         + compileExprSource.expr(prop.expr)
//                                         + ', '
//                                         + valueCode
//                                         + ')) {'
//                                     );
//                                     sourceBuffer.joinString(' checked');
//                                     sourceBuffer.addRaw('}');
//                                     break;
// 
//                                 case 'radio':
//                                     sourceBuffer.addRaw('if ('
//                                         + compileExprSource.expr(prop.expr)
//                                         + ' === '
//                                         + valueCode
//                                         + ') {'
//                                     );
//                                     sourceBuffer.joinString(' checked');
//                                     sourceBuffer.addRaw('}');
//                                     break;
//                             }
//                         }
//                     }
//                     break;
// 
//                 default:
//                     if (prop.attr) {
//                         sourceBuffer.joinString(' ' + prop.attr);
//                     }
//                     else {
//                         sourceBuffer.joinRaw('attrFilter("' + prop.name + '", '
//                             + (prop.x ? 'escapeHTML(' : '')
//                             + compileExprSource.expr(prop.expr)
//                             + (prop.x ? ')' : '')
//                             + ')'
//                         );
//                     }
//                     break;
//             }
//         });
// 
//         if (bindDirective) {
//             sourceBuffer.addRaw(
//                 '(function ($bindObj) {for (var $key in $bindObj) {'
//                 + 'var $value = $bindObj[$key];'
//             );
// 
//             if (tagName === 'textarea') {
//                 sourceBuffer.addRaw(
//                     'if ($key === "value") {'
//                     + 'continue;'
//                     + '}'
//                 );
//             }
// 
//             sourceBuffer.addRaw('switch ($key) {\n'
//                 + 'case "readonly":\n'
//                 + 'case "disabled":\n'
//                 + 'case "multiple":\n'
//                 + 'case "multiple":\n'
//                 + 'html += boolAttrFilter($key, escapeHTML($value));\n'
//                 + 'break;\n'
//                 + 'default:\n'
//                 + 'html += attrFilter($key, escapeHTML($value));'
//                 + '}'
//             );
// 
//             sourceBuffer.addRaw(
//                 '}})('
//                 + compileExprSource.expr(bindDirective.value)
//                 + ');'
//             );
//         }
// 
//         sourceBuffer.joinString('>');
//     },
//     /* eslint-enable max-params */
// 
//     /**
//      * 编译元素闭合
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {string} tagName 标签名
//      */
//     tagEnd: function (sourceBuffer, tagName) {
//         if (!autoCloseTags[tagName]) {
//             sourceBuffer.joinString('</' + tagName + '>');
//         }
// 
//         if (tagName === 'select') {
//             sourceBuffer.addRaw('$selectValue = null;');
//         }
// 
//         if (tagName === 'option') {
//             sourceBuffer.addRaw('$optionValue = null;');
//         }
//     },
// 
//     /**
//      * 编译元素内容
//      *
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {ANode} aNode 元素的抽象节点信息
//      * @param {Component} owner 所属组件实例环境
//      */
//     inner: function (sourceBuffer, aNode, owner) {
//         // inner content
//         if (aNode.tagName === 'textarea') {
//             var valueProp = getANodeProp(aNode, 'value');
//             if (valueProp) {
//                 sourceBuffer.joinRaw('escapeHTML('
//                     + compileExprSource.expr(valueProp.expr)
//                     + ')'
//                 );
//             }
// 
//             return;
//         }
// 
//         var htmlDirective = aNode.directives.html;
//         if (htmlDirective) {
//             sourceBuffer.joinExpr(htmlDirective.value);
//         }
//         else {
//             /* eslint-disable no-use-before-define */
//             each(aNode.children, function (aNodeChild) {
//                 sourceBuffer.addRaw(aNodeCompiler.compile(aNodeChild, sourceBuffer, owner));
//             });
//             /* eslint-enable no-use-before-define */
//         }
//     }
// };
// 
// /**
//  * ANode 的编译方法集合对象
//  *
//  * @inner
//  */
// var aNodeCompiler = {
// 
//     /**
//      * 编译节点
//      *
//      * @param {ANode} aNode 抽象节点
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      */
//     compile: function (aNode, sourceBuffer, owner, extra) {
//         extra = extra || {};
//         var compileMethod = 'compileElement';
// 
//         if (aNode.textExpr) {
//             compileMethod = 'compileText';
//         }
//         else if (aNode.directives['if']) { // eslint-disable-line dot-notation
//             compileMethod = 'compileIf';
//         }
//         else if (aNode.directives['for']) { // eslint-disable-line dot-notation
//             compileMethod = 'compileFor';
//         }
//         else if (aNode.tagName === 'slot') {
//             compileMethod = 'compileSlot';
//         }
//         else if (aNode.tagName === 'template') {
//             compileMethod = 'compileTemplate';
//         }
//         else {
//             var ComponentType = owner.getComponentType
//                 ? owner.getComponentType(aNode)
//                 : owner.components[aNode.tagName];
//             if (ComponentType) {
//                 compileMethod = 'compileComponent';
//                 extra.ComponentClass = ComponentType;
//             }
//         }
// 
//         aNodeCompiler[compileMethod](aNode, sourceBuffer, owner, extra);
//     },
// 
//     /**
//      * 编译文本节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      */
//     compileText: function (aNode, sourceBuffer) {
//         if (aNode.textExpr.original) {
//             sourceBuffer.joinString(serializeStump('text'));
//         }
// 
//         sourceBuffer.joinExpr(aNode.textExpr);
// 
//         if (aNode.textExpr.original) {
//             sourceBuffer.joinString(serializeStumpEnd('text'));
//         }
//     },
// 
//     /**
//      * 编译template节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileTemplate: function (aNode, sourceBuffer, owner) {
//         elementSourceCompiler.inner(sourceBuffer, aNode, owner);
//     },
// 
//     /**
//      * 编译 if 节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileIf: function (aNode, sourceBuffer, owner) {
//         sourceBuffer.addRaw('(function () {');
// 
//         sourceBuffer.addRaw('var ifIndex = null;');
// 
//         // output main if
//         var ifDirective = aNode.directives['if']; // eslint-disable-line dot-notation
//         sourceBuffer.addRaw('if (' + compileExprSource.expr(ifDirective.value) + ') {');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 rinseCondANode(aNode),
//                 sourceBuffer,
//                 owner
//             )
//         );
//         sourceBuffer.addRaw('}');
// 
//         // output elif and else
//         each(aNode.elses, function (elseANode, index) {
//             var elifDirective = elseANode.directives.elif;
//             if (elifDirective) {
//                 sourceBuffer.addRaw('else if (' + compileExprSource.expr(elifDirective.value) + ') {');
//             }
//             else {
//                 sourceBuffer.addRaw('else {');
//             }
// 
//             sourceBuffer.addRaw(
//                 aNodeCompiler.compile(
//                     rinseCondANode(elseANode),
//                     sourceBuffer,
//                     owner
//                 )
//             );
//             sourceBuffer.addRaw('}');
//         });
// 
//         sourceBuffer.addRaw('})();');
//     },
// 
//     /**
//      * 编译 for 节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileFor: function (aNode, sourceBuffer, owner) {
//         var forElementANode = createANode({
//             children: aNode.children,
//             props: aNode.props,
//             events: aNode.events,
//             tagName: aNode.tagName,
//             directives: cloneDirectives(aNode.directives, {
//                 'for': 1
//             }),
//             hotspot: aNode.hotspot
//         });
// 
//         var forDirective = aNode.directives['for']; // eslint-disable-line dot-notation
//         var itemName = forDirective.item.raw;
//         var indexName = forDirective.index.raw;
//         var listName = guid();
// 
//         if (indexName === '$index') {
//             indexName = guid();
//         }
// 
//         sourceBuffer.addRaw('var ' + listName + ' = ' + compileExprSource.expr(forDirective.value) + ';');
//         sourceBuffer.addRaw('if (' + listName + ' instanceof Array) {');
// 
//         // for array
//         sourceBuffer.addRaw('for ('
//             + 'var ' + indexName + ' = 0; '
//             + indexName + ' < ' + listName + '.length; '
//             + indexName + '++) {'
//         );
//         sourceBuffer.addRaw('componentCtx.data.' + indexName + '=' + indexName + ';');
//         sourceBuffer.addRaw('componentCtx.data.' + itemName + '= ' + listName + '[' + indexName + '];');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 forElementANode,
//                 sourceBuffer,
//                 owner
//             )
//         );
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('} else if (typeof ' + listName + ' === "object") {');
// 
//         // for object
//         sourceBuffer.addRaw('for (var ' + indexName + ' in ' + listName + ') {');
//         sourceBuffer.addRaw('if (' + listName + '[' + indexName + '] != null) {');
//         sourceBuffer.addRaw('componentCtx.data.' + indexName + '=' + indexName + ';');
//         sourceBuffer.addRaw('componentCtx.data.' + itemName + '= ' + listName + '[' + indexName + '];');
//         sourceBuffer.addRaw(
//             aNodeCompiler.compile(
//                 forElementANode,
//                 sourceBuffer,
//                 owner
//             )
//         );
//         sourceBuffer.addRaw('}');
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('}');
//     },
// 
//     /**
//      * 编译 slot 节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      */
//     compileSlot: function (aNode, sourceBuffer, owner) {
//         sourceBuffer.addRaw('(function () {');
// 
//         sourceBuffer.addRaw('function $defaultSlotRender(componentCtx) {');
//         sourceBuffer.addRaw('  var html = "";');
//         each(aNode.children, function (aNodeChild) {
//             sourceBuffer.addRaw(aNodeCompiler.compile(aNodeChild, sourceBuffer, owner));
//         });
//         sourceBuffer.addRaw('  return html;');
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('  var $givenSlot = [];');
// 
//         var nameProp = getANodeProp(aNode, 'name');
//         if (nameProp) {
//             sourceBuffer.addRaw('var $slotName = ' + compileExprSource.expr(nameProp.expr) + ';');
//         }
//         else {
//             sourceBuffer.addRaw('var $slotName = null;');
//         }
// 
//         sourceBuffer.addRaw('var $ctxGivenSlots = componentCtx.givenSlots;');
//         sourceBuffer.addRaw('for (var $i = 0; $i < $ctxGivenSlots.length; $i++) {');
//         sourceBuffer.addRaw('  if ($ctxGivenSlots[$i][1] == $slotName) {');
//         sourceBuffer.addRaw('    $givenSlot.push($ctxGivenSlots[$i][0]);');
//         sourceBuffer.addRaw('  }');
//         sourceBuffer.addRaw('}');
// 
// 
//         sourceBuffer.addRaw('var $isInserted = $givenSlot.length > 0;');
//         sourceBuffer.addRaw('if (!$isInserted) { $givenSlot.push($defaultSlotRender); }');
// 
//         sourceBuffer.addRaw('var $slotCtx = $isInserted ? componentCtx.owner : componentCtx;');
// 
//         if (aNode.vars || aNode.directives.bind) {
//             sourceBuffer.addRaw('$slotCtx = {data: extend({}, $slotCtx.data), filters: $slotCtx.filters, callFilter: $slotCtx.callFilter};'); // eslint-disable-line
// 
//             if (aNode.directives.bind) {
//                 sourceBuffer.addRaw('extend($slotCtx.data, ' + compileExprSource.expr(aNode.directives.bind.value) + ');'); // eslint-disable-line
//             }
// 
//             each(aNode.vars, function (varItem) {
//                 sourceBuffer.addRaw(
//                     '$slotCtx.data["' + varItem.name + '"] = '
//                     + compileExprSource.expr(varItem.expr)
//                     + ';'
//                 );
//             });
//         }
// 
//         sourceBuffer.addRaw('for (var $renderIndex = 0; $renderIndex < $givenSlot.length; $renderIndex++) {');
//         sourceBuffer.addRaw('  html += $givenSlot[$renderIndex]($slotCtx);');
//         sourceBuffer.addRaw('}');
// 
//         sourceBuffer.addRaw('})();');
//     },
// 
//     /**
//      * 编译普通节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      */
//     compileElement: function (aNode, sourceBuffer, owner, extra) {
//         extra = extra || {};
//         // if (aNode.tagName === 'option'
//         //     && !getANodeProp(aNode, 'value')
//         //     && aNode.children[0]
//         // ) {
//         //     aNode.props.push({
//         //         name: 'value',
//         //         expr: aNode.children[0].textExpr
//         //     });
//         // }
// 
//         elementSourceCompiler.tagStart(
//             sourceBuffer,
//             aNode.tagName,
//             aNode.props,
//             extra.prop,
//             aNode.directives.bind
//         );
// 
//         elementSourceCompiler.inner(sourceBuffer, aNode, owner);
//         elementSourceCompiler.tagEnd(sourceBuffer, aNode.tagName);
//     },
// 
//     /**
//      * 编译组件节点
//      *
//      * @param {ANode} aNode 节点对象
//      * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//      * @param {Component} owner 所属组件实例环境
//      * @param {Object} extra 编译所需的一些额外信息
//      * @param {Function} extra.ComponentClass 对应组件类
//      */
//     compileComponent: function (aNode, sourceBuffer, owner, extra) {
//         if (aNode) {
//             sourceBuffer.addRaw('var $slotName = null;');
//             sourceBuffer.addRaw('var $givenSlots = [];');
//             each(aNode.children, function (child) {
//                 var slotBind = !child.textExpr && getANodeProp(child, 'slot');
//                 if (slotBind) {
//                     sourceBuffer.addRaw('$slotName = ' + compileExprSource.expr(slotBind.expr) + ';');
//                     sourceBuffer.addRaw('$givenSlots.push([function (componentCtx) {');
//                     sourceBuffer.addRaw('  var html = "";');
//                     sourceBuffer.addRaw(aNodeCompiler.compile(child, sourceBuffer, owner));
//                     sourceBuffer.addRaw('  return html;');
//                     sourceBuffer.addRaw('}, $slotName]);');
//                 }
//                 else {
//                     sourceBuffer.addRaw('$givenSlots.push([function (componentCtx) {');
//                     sourceBuffer.addRaw('  var html = "";');
//                     sourceBuffer.addRaw(aNodeCompiler.compile(child, sourceBuffer, owner));
//                     sourceBuffer.addRaw('  return html;');
//                     sourceBuffer.addRaw('}]);');
//                 }
//             });
//         }
// 
//         var ComponentClass = extra.ComponentClass;
//         var component = new ComponentClass({
//             aNode: aNode,
//             owner: owner,
//             subTag: aNode.tagName
//         });
// 
//         var givenData = [];
// 
//         each(component.binds, function (prop) {
//             givenData.push(
//                 compileExprSource.stringLiteralize(prop.name)
//                 + ':'
//                 + compileExprSource.expr(prop.expr)
//             );
//         });
// 
//         var givenDataHTML = '{' + givenData.join(',\n') + '}';
//         if (aNode.directives.bind) {
//             givenDataHTML = 'extend('
//                 + compileExprSource.expr(aNode.directives.bind.value)
//                  + ', '
//                 + givenDataHTML
//                 + ')';
//         }
// 
//         sourceBuffer.addRaw('html += (');
//         sourceBuffer.addRendererStart();
//         compileComponentSource(sourceBuffer, component, extra && extra.prop);
//         sourceBuffer.addRendererEnd();
//         sourceBuffer.addRaw(')(' + givenDataHTML + ', componentCtx, $givenSlots);');
//         sourceBuffer.addRaw('$givenSlots = null;');
//     }
// };
// 
// /**
//  * 生成组件 renderer 时 ctx 对象构建的代码
//  *
//  * @inner
//  * @param {CompileSourceBuffer} sourceBuffer 编译源码的中间buffer
//  * @param {Object} component 组件实例
//  * @param {string?} extraProp 额外的属性串
//  */
// function compileComponentSource(sourceBuffer, component, extraProp) {
//     sourceBuffer.addRaw(genComponentContextCode(component));
//     sourceBuffer.addRaw('componentCtx.owner = parentCtx;');
//     sourceBuffer.addRaw('componentCtx.givenSlots = givenSlots;');
// 
// 
//     sourceBuffer.addRaw('data = extend(componentCtx.data, data);');
//     sourceBuffer.addRaw('for (var $i = 0; $i < componentCtx.computedNames.length; $i++) {');
//     sourceBuffer.addRaw('  var $computedName = componentCtx.computedNames[$i];');
//     sourceBuffer.addRaw('  data[$computedName] = componentCtx.computed[$computedName]();');
//     sourceBuffer.addRaw('}');
// 
//     extraProp = extraProp || '';
// 
//     var eventDeclarations = [];
//     for (var key in component.listeners) {
//         if (component.listeners.hasOwnProperty(key)) {
//             each(component.listeners[key], function (listener) {
//                 if (listener.declaration) {
//                     eventDeclarations.push(listener.declaration);
//                 }
//             });
//         }
//     }
// 
//     elementSourceCompiler.tagStart(
//         sourceBuffer,
//         component.tagName,
//         component.aNode.props,
//         extraProp,
//         component.aNode.directives.bind
//     );
// 
//     if (!component.owner) {
//         sourceBuffer.joinString('<!--s-data:');
//         sourceBuffer.joinDataStringify();
//         sourceBuffer.joinString('-->');
//     }
// 
// 
//     elementSourceCompiler.inner(sourceBuffer, component.aNode, component);
//     elementSourceCompiler.tagEnd(sourceBuffer, component.tagName);
// }
// 
// var stringifier = {
//     obj: function (source) {
//         var prefixComma;
//         var result = '{';
// 
//         for (var key in source) {
//             if (!source.hasOwnProperty(key) || typeof source[key] === 'undefined') {
//                 continue;
//             }
// 
//             if (prefixComma) {
//                 result += ',';
//             }
//             prefixComma = 1;
// 
//             result += compileExprSource.stringLiteralize(key) + ':' + stringifier.any(source[key]);
//         }
// 
//         return result + '}';
//     },
// 
//     arr: function (source) {
//         var prefixComma;
//         var result = '[';
// 
//         each(source, function (value) {
//             if (prefixComma) {
//                 result += ',';
//             }
//             prefixComma = 1;
// 
//             result += stringifier.any(value);
//         });
// 
//         return result + ']';
//     },
// 
//     str: function (source) {
//         return compileExprSource.stringLiteralize(source);
//     },
// 
//     date: function (source) {
//         return 'new Date(' + source.getTime() + ')';
//     },
// 
//     any: function (source) {
//         switch (typeof source) {
//             case 'string':
//                 return stringifier.str(source);
// 
//             case 'number':
//                 return '' + source;
// 
//             case 'boolean':
//                 return source ? 'true' : 'false';
// 
//             case 'object':
//                 if (!source) {
//                     return null;
//                 }
// 
//                 if (source instanceof Array) {
//                     return stringifier.arr(source);
//                 }
// 
//                 if (source instanceof Date) {
//                     return stringifier.date(source);
//                 }
// 
//                 return stringifier.obj(source);
//         }
// 
//         throw new Error('Cannot Stringify:' + source);
//     }
// };
// 
// var COMPONENT_RESERVED_MEMBERS = splitStr2Obj('computed,filters,components,'
//     + 'initData,template,attached,created,detached,disposed,compiled'
// );
// 
// /**
//  * 生成组件 renderer 时 ctx 对象构建的代码
//  *
//  * @inner
//  * @param {Object} component 组件实例
//  * @return {string}
//  */
// function genComponentContextCode(component) {
//     var code = ['var componentCtx = {'];
// 
//     // members for call expr
//     var ComponentProto = component.constructor.prototype;
//     Object.keys(ComponentProto).forEach(function (protoMemberKey) {
//         var protoMember = ComponentProto[protoMemberKey];
//         if (COMPONENT_RESERVED_MEMBERS[protoMemberKey] || !protoMember) {
//             return;
//         }
// 
//         switch (typeof protoMember) {
//             case 'function':
//                 code.push(protoMemberKey + ': ' + protoMember.toString() + ',');
//                 break;
// 
//             case 'object':
//                 code.push(protoMemberKey + ':');
// 
//                 if (protoMember instanceof Array) {
//                     code.push('[');
//                     protoMember.forEach(function (item) {
//                         code.push(typeof item === 'function' ? item.toString() : '' + ',');
//                     });
//                     code.push(']');
//                 }
//                 else {
//                     code.push('{');
//                     Object.keys(protoMember).forEach(function (itemKey) {
//                         var item = protoMember[itemKey];
//                         if (typeof item === 'function') {
//                             code.push(itemKey + ':' + item.toString() + ',');
//                         }
//                     });
//                     code.push('}');
//                 }
// 
//                 code.push(',');
//         }
//     });
// 
//     // given anode
//     code.push('givenSlots: [],');
// 
//     // filters
//     code.push('filters: {');
//     var filterCode = [];
//     for (var key in component.filters) {
//         if (component.filters.hasOwnProperty(key)) {
//             var filter = component.filters[key];
// 
//             if (typeof filter === 'function') {
//                 filterCode.push(key + ': ' + filter.toString());
//             }
//         }
//     }
//     code.push(filterCode.join(','));
//     code.push('},');
// 
//     code.push(
//         'callFilter: function (name, args) {',
//         '    var filter = this.filters[name] || DEFAULT_FILTERS[name];',
//         '    if (typeof filter === "function") {',
//         '        return filter.apply(this, args);',
//         '    }',
//         '},'
//     );
// 
//     /* eslint-disable no-redeclare */
//     // computed obj
//     code.push('computed: {');
//     var computedCode = [];
//     for (var key in component.computed) {
//         if (component.computed.hasOwnProperty(key)) {
//             var computed = component.computed[key];
// 
//             if (typeof computed === 'function') {
//                 computedCode.push(key + ': '
//                     + computed.toString().replace(
//                         /this.data.get\(([^\)]+)\)/g,
//                         function (match, exprLiteral) {
//                             var exprStr = (new Function('return ' + exprLiteral))();
//                             var expr = parseExpr(exprStr);
// 
//                             return compileExprSource.expr(expr);
//                         })
//                 );
//             }
//         }
//     }
//     code.push(computedCode.join(','));
//     code.push('},');
// 
//     // computed names
//     code.push('computedNames: [');
//     computedCode = [];
//     for (var key in component.computed) {
//         if (component.computed.hasOwnProperty(key)) {
//             var computed = component.computed[key];
// 
//             if (typeof computed === 'function') {
//                 computedCode.push('"' + key + '"');
//             }
//         }
//     }
//     code.push(computedCode.join(','));
//     code.push('],');
//     /* eslint-enable no-redeclare */
// 
//     // data
//     code.push('data: ' + stringifier.any(component.data.get()) + ',');
// 
//     // tagName
//     code.push('tagName: "' + component.tagName + '"');
//     code.push('};');
// 
//     return code.join('\n');
// }
// 
// /* eslint-enable guard-for-in */
// 
// /* eslint-disable no-unused-vars */
// /* eslint-disable fecs-camelcase */
// 
// /**
//  * 组件编译的模板函数
//  *
//  * @inner
//  */
// function componentCompilePreCode() {
//     var $version = '3.6.14';
// 
//     function extend(target, source) {
//         if (source) {
//             Object.keys(source).forEach(function (key) {
//                 let value = source[key];
//                 if (typeof value !== 'undefined') {
//                     target[key] = value;
//                 }
//             });
//         }
// 
//         return target;
//     }
// 
//     function each(array, iterator) {
//         if (array && array.length > 0) {
//             for (var i = 0, l = array.length; i < l; i++) {
//                 if (iterator(array[i], i) === false) {
//                     break;
//                 }
//             }
//         }
//     }
// 
//     function contains(array, value) {
//         var result;
//         each(array, function (item) {
//             result = item === value;
//             return !result;
//         });
// 
//         return result;
//     }
// 
//     var HTML_ENTITY = {
//         /* jshint ignore:start */
//         '&': '&amp;',
//         '<': '&lt;',
//         '>': '&gt;',
//         '"': '&quot;',
//         /* eslint-disable quotes */
//         "'": '&#39;'
//         /* eslint-enable quotes */
//         /* jshint ignore:end */
//     };
// 
//     function htmlFilterReplacer(c) {
//         return HTML_ENTITY[c];
//     }
// 
//     function escapeHTML(source) {
//         if (source == null) {
//             return '';
//         }
// 
//         return String(source).replace(/[&<>"']/g, htmlFilterReplacer);
//     }
// 
//     var DEFAULT_FILTERS = {
//         url: encodeURIComponent,
//         _class: function (source) {
//             if (source instanceof Array) {
//                 return source.join(' ');
//             }
// 
//             return source;
//         },
//         _style: function (source) {
//             if (typeof source === 'object') {
//                 var result = '';
//                 if (source) {
//                     Object.keys(source).forEach(function (key) {
//                         result += key + ':' + source[key] + ';';
//                     });
//                 }
// 
//                 return result;
//             }
// 
//             return source || '';
//         },
//         _sep: function (source, sep) {
//             return source ? sep + source : '';
//         }
//     };
// 
//     function attrFilter(name, value) {
//         if (value) {
//             return ' ' + name + '="' + value + '"';
//         }
// 
//         return '';
//     }
// 
//     function boolAttrFilter(name, value) {
//         if (value && value !== 'false' && value !== '0') {
//             return ' ' + name;
//         }
// 
//         return '';
//     }
// 
//     function stringLiteralize(source) {
//         return '"'
//             + source
//                 .replace(/\x5C/g, '\\\\')
//                 .replace(/"/g, '\\"')
//                 .replace(/\x0A/g, '\\n')
//                 .replace(/\x09/g, '\\t')
//                 .replace(/\x0D/g, '\\r')
//             + '"';
//     }
// 
//     var stringifier = {
//         obj: function (source) {
//             var prefixComma;
//             var result = '{';
// 
//             Object.keys(source).forEach(function (key) {
//                 if (typeof source[key] === 'undefined') {
//                     return;
//                 }
// 
//                 if (prefixComma) {
//                     result += ',';
//                 }
//                 prefixComma = 1;
// 
//                 result += stringLiteralize(key) + ':' + stringifier.any(source[key]);
//             });
// 
//             return result + '}';
//         },
// 
//         arr: function (source) {
//             var prefixComma;
//             var result = '[';
// 
//             each(source, function (value) {
//                 if (prefixComma) {
//                     result += ',';
//                 }
//                 prefixComma = 1;
// 
//                 result += stringifier.any(value);
//             });
// 
//             return result + ']';
//         },
// 
//         str: function (source) {
//             return stringLiteralize(source);
//         },
// 
//         date: function (source) {
//             return 'new Date(' + source.getTime() + ')';
//         },
// 
//         any: function (source) {
//             switch (typeof source) {
//                 case 'string':
//                     return stringifier.str(source);
// 
//                 case 'number':
//                     return '' + source;
// 
//                 case 'boolean':
//                     return source ? 'true' : 'false';
// 
//                 case 'object':
//                     if (!source) {
//                         return null;
//                     }
// 
//                     if (source instanceof Array) {
//                         return stringifier.arr(source);
//                     }
// 
//                     if (source instanceof Date) {
//                         return stringifier.date(source);
//                     }
// 
//                     return stringifier.obj(source);
//             }
// 
//             throw new Error('Cannot Stringify:' + source);
//         }
//     };
// }
// /* eslint-enable no-unused-vars */
// /* eslint-enable fecs-camelcase */
// 
// /**
//  * 将组件编译成 render 方法的 js 源码
//  *
//  * @param {Function} ComponentClass 组件类
//  * @return {string}
//  */
// function compileJSSource(ComponentClass) {
//     var sourceBuffer = new CompileSourceBuffer();
// 
//     sourceBuffer.addRendererStart();
//     sourceBuffer.addRaw(
//         componentCompilePreCode.toString()
//             .split('\n')
//             .slice(1)
//             .join('\n')
//             .replace(/\}\s*$/, '')
//     );
// 
//     // 先初始化个实例，让模板编译成 ANode，并且能获得初始化数据
//     var component = new ComponentClass();
// 
//     compileComponentSource(sourceBuffer, component);
//     sourceBuffer.addRendererEnd();
//     return sourceBuffer.toCode();
// }
// #[end]

// exports = module.exports = compileJSSource;

    /* eslint-disable no-unused-vars */
//     var nextTick = require('./util/next-tick');
//     var inherits = require('./util/inherits');
//     var parseTemplate = require('./parser/parse-template');
//     var parseExpr = require('./parser/parse-expr');
//     var ExprType = require('./parser/expr-type');
//     var LifeCycle = require('./view/life-cycle');
//     var NodeType = require('./view/node-type');
//     var Component = require('./view/component');
//     var compileComponent = require('./view/compile-component');
//     var defineComponent = require('./view/define-component');
//     var emitDevtool = require('./util/emit-devtool');
//     var compileJSSource = require('./view/compile-js-source');
//     var Data = require('./runtime/data');
//     var evalExpr = require('./runtime/eval-expr');
//     var DataTypes = require('./util/data-types');


    var san = {
        /**
         * san版本号
         *
         * @type {string}
         */
        version: '3.6.14',

        // #[begin] devtool
        /**
         * 是否开启调试。开启调试时 devtool 会工作
         *
         * @type {boolean}
         */
        debug: true,
        // #[end]

        // #[begin] ssr
//         /**
//          * 将组件类编译成 renderer 方法
//          *
//          * @param {Function} ComponentClass 组件类
//          * @return {function(Object):string}
//          */
//         compileToRenderer: function (ComponentClass) {
//             var renderer = ComponentClass.__ssrRenderer;
// 
//             if (!renderer) {
//                 var code = compileJSSource(ComponentClass);
//                 renderer = (new Function('return ' + code))();
//                 ComponentClass.__ssrRenderer = renderer;
//             }
// 
//             return renderer;
//         },
// 
//         /**
//          * 将组件类编译成 renderer 方法的源文件
//          *
//          * @param {Function} ComponentClass 组件类
//          * @return {string}
//          */
//         compileToSource: compileJSSource,
        // #[end]

        /**
         * 组件基类
         *
         * @type {Function}
         */
        Component: Component,

        /**
         * 创建组件类
         *
         * @param {Object} proto 组件类的方法表
         * @return {Function}
         */
        defineComponent: defineComponent,

        /**
         * 编译组件类。预解析template和components
         *
         * @param {Function} ComponentClass 组件类
         */
        compileComponent: compileComponent,

        /**
         * 解析 template
         *
         * @inner
         * @param {string} source template 源码
         * @return {ANode}
         */
        parseTemplate: parseTemplate,

        /**
         * 解析表达式
         *
         * @param {string} source 源码
         * @return {Object}
         */
        parseExpr: parseExpr,

        /**
         * 表达式类型枚举
         *
         * @const
         * @type {Object}
         */
        ExprType: ExprType,

        /**
         * 生命周期
         */
        LifeCycle: LifeCycle,

        /**
         * 节点类型
         *
         * @const
         * @type {Object}
         */
        NodeType: NodeType,

        /**
         * 在下一个更新周期运行函数
         *
         * @param {Function} fn 要运行的函数
         */
        nextTick: nextTick,

        /**
         * 数据类
         *
         * @class
         * @param {Object?} data 初始数据
         * @param {Data?} parent 父级数据对象
         */
        Data: Data,

        /**
         * 计算表达式的值
         *
         * @param {Object} expr 表达式对象
         * @param {Data} data 数据对象
         * @param {Component=} owner 组件对象，用于表达式中filter的执行
         * @return {*}
         */
        evalExpr: evalExpr,

        /**
         * 构建类之间的继承关系
         *
         * @param {Function} subClass 子类函数
         * @param {Function} superClass 父类函数
         */
        inherits: inherits,

        /**
         * DataTypes
         *
         * @type {Object}
         */
        DataTypes: DataTypes
    };

    // export
    if (true) {
        // For CommonJS
        exports = module.exports = san;
    }
    else {}

    // #[begin] devtool
    emitDevtool.start(san);
    // #[end]
})(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/checkbox.san":
/*!**************************!*\
  !*** ./src/checkbox.san ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __san_script__, __san_template__
var __san_styles__ = {}
__san_script__ = __webpack_require__(/*! !babel-loader!../node_modules/san-loader/lib/selector.js?type=script&index=0!./checkbox.san */ "./node_modules/babel-loader/lib/index.js!./node_modules/san-loader/lib/selector.js?type=script&index=0!./src/checkbox.san")
if (__san_script__ &&
    __san_script__.__esModule &&
    Object.keys(__san_script__).length > 1) {
  console.warn("[san-loader] src\\checkbox.san: named exports in *.san files are ignored.")}
__san_template__ = __webpack_require__(/*! !html-loader?minimize=false!../node_modules/san-loader/lib/selector.js?type=template&index=0!./checkbox.san */ "./node_modules/html-loader/index.js?minimize=false!./node_modules/san-loader/lib/selector.js?type=template&index=0!./src/checkbox.san")
var __san_proto__ = {}
if (__san_script__) {
  __san_proto__ = __san_script__.__esModule
    ? __san_script__['default']
    : __san_script__
}
if (__san_template__) {
  __san_proto__.template = __san_template__
}
var san = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js")
var __san_exports__ = san.defineComponent(__san_proto__)
module.exports = __san_exports__
if (module.exports.__esModule) module.exports = module.exports['default']
if (!__san_exports__.computed) __san_exports__.computed = {}
Object.keys(__san_styles__).forEach(function (key) {
var module = __san_styles__[key]
__san_exports__.computed[key] = function () { return module }
})


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./checkbox.san */ "./src/checkbox.san"));

var _input = _interopRequireDefault(__webpack_require__(/*! ./input.san */ "./src/input.san"));

__webpack_require__(/*! ./main.css */ "./src/main.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import './style.css';
console.log("development");
SetTitle('输入框', 'Input', '待补充');
var b = new _input.default().attach(document.body);
SetTitle('输入框', 'Input', '待补充');
var a = new _checkbox.default().attach(document.body);

function SetTitle(Cname, Name, Content) {
  var div = create('titleArea', '', 'div');
  var sdiv = create('cname', Cname, 'h1');
  sdiv.appendChild(create('logo', '控件', 'p'));
  sdiv.appendChild(create('name', Name, 'p'));
  div.appendChild(sdiv);
  div.appendChild(create('content', Content, 'p'));
  document.body.appendChild(div); //create('cname', Cname, 'p')
  //create('name', Name, 'p')
  //create('logo', '控件', 'p')
  //create('content', Content, 'p')

  function create(name, content, div) {
    var p = div || 'div';
    var block = document.createElement(p);
    block.setAttribute('class', name);
    block.innerHTML = content;
    return block;
  }
}

/***/ }),

/***/ "./src/input.san":
/*!***********************!*\
  !*** ./src/input.san ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __san_script__, __san_template__
var __san_styles__ = {}
__san_script__ = __webpack_require__(/*! !babel-loader!../node_modules/san-loader/lib/selector.js?type=script&index=0!./input.san */ "./node_modules/babel-loader/lib/index.js!./node_modules/san-loader/lib/selector.js?type=script&index=0!./src/input.san")
if (__san_script__ &&
    __san_script__.__esModule &&
    Object.keys(__san_script__).length > 1) {
  console.warn("[san-loader] src\\input.san: named exports in *.san files are ignored.")}
__san_template__ = __webpack_require__(/*! !html-loader?minimize=false!../node_modules/san-loader/lib/selector.js?type=template&index=0!./input.san */ "./node_modules/html-loader/index.js?minimize=false!./node_modules/san-loader/lib/selector.js?type=template&index=0!./src/input.san")
var __san_proto__ = {}
if (__san_script__) {
  __san_proto__ = __san_script__.__esModule
    ? __san_script__['default']
    : __san_script__
}
if (__san_template__) {
  __san_proto__.template = __san_template__
}
var san = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js")
var __san_exports__ = san.defineComponent(__san_proto__)
module.exports = __san_exports__
if (module.exports.__esModule) module.exports = module.exports['default']
if (!__san_exports__.computed) __san_exports__.computed = {}
Object.keys(__san_styles__).forEach(function (key) {
var module = __san_styles__[key]
__san_exports__.computed[key] = function () { return module }
})


/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!./main.css */ "./node_modules/css-loader/index.js!./src/main.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader!./main.css */ "./node_modules/css-loader/index.js!./src/main.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader!./main.css */ "./node_modules/css-loader/index.js!./src/main.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map