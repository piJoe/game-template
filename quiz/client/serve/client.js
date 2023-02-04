(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b ||= {})
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/escape-html/index.js
  var require_escape_html = __commonJS({
    "node_modules/escape-html/index.js"(exports2, module2) {
      "use strict";
      var matchHtmlRegExp = /["'&<>]/;
      module2.exports = escapeHtml;
      function escapeHtml(string) {
        var str = "" + string;
        var match = matchHtmlRegExp.exec(str);
        if (!match) {
          return str;
        }
        var escape;
        var html = "";
        var index = 0;
        var lastIndex = 0;
        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape = "&quot;";
              break;
            case 38:
              escape = "&amp;";
              break;
            case 39:
              escape = "&#39;";
              break;
            case 60:
              escape = "&lt;";
              break;
            case 62:
              escape = "&gt;";
              break;
            default:
              continue;
          }
          if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
          }
          lastIndex = index + 1;
          html += escape;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
    }
  });

  // quiz/client/src/globalstate.ts
  var globalState = {
    me: {
      id: "",
      name: ""
    }
  };

  // quiz/client/src/overlay.ts
  var overlay = document.querySelector(".overlay-container");
  var openDialogs = /* @__PURE__ */ new Map();
  var dialogId = 0;
  overlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target.hasAttribute("data-popup-id")) {
      const id = target.getAttribute("data-popup-id");
      const value = target.getAttribute("data-value");
      closeDialog(id, value);
    }
  });
  function closeDialog(id, value) {
    var _a2;
    const d = openDialogs.get(id);
    if (d) {
      overlay.removeChild(d.dom);
    }
    openDialogs.delete(id);
    if ((_a2 = d.options) == null ? void 0 : _a2.callback) {
      d.options.callback(value);
    }
    if (openDialogs.size < 1) {
      overlay.setAttribute("data-active", "false");
    }
  }
  function showDialog(title, msg, options) {
    const id = (dialogId++).toString();
    const container = document.createElement("div");
    container.classList.add("container", "container-fadein");
    const actions = [];
    if (!(options == null ? void 0 : options.actions)) {
      actions.push(
        `<input type="button" data-popup-id="${id}" data-value="ok" class="button button-outline" value="OK">`
      );
    } else {
      actions.push(
        ...options.actions.map(
          (a) => `<input type="button" data-popup-id="${id}" data-value="${a.value}" class="button ${a.class}" value="${a.title}">`
        )
      );
    }
    container.innerHTML = `
    <div class="title-h2">${title}</div>
    <div class="dialog-content">${msg && msg.length > 0 ? `${msg}` : ""}</div>
    <div class="dialog-actions">${actions.join("")}</div>`;
    if (options == null ? void 0 : options.alternativeContentDom) {
      container.querySelector(".dialog-content").appendChild(options.alternativeContentDom);
    }
    openDialogs.set(id, { dom: container, options });
    overlay.setAttribute("data-active", "true");
    overlay.appendChild(container);
    const input = container.querySelector("input[type=text]");
    if (input) {
      input.focus({
        preventScroll: true
      });
    }
    if (options == null ? void 0 : options.closeDialogPromise) {
      options.closeDialogPromise.then(() => {
        closeDialog(id);
      });
    }
  }

  // quiz/client/src/websocket.ts
  var Socket = class {
    constructor() {
      this.ws = null;
      this.listener = /* @__PURE__ */ new Map();
      this.listenerId = 0;
    }
    open() {
      if (this.ws) {
        throw new Error("Socket is already open??");
      }
      this.ws = new WebSocket(
        `${location.protocol === "http:" ? "ws:" : "wss:"}//${location.host}/`
      );
      this.ws.addEventListener("message", (m) => {
        const { type, data } = JSON.parse(m.data);
        this.handleMessage(type, data);
      });
      this.ws.addEventListener("close", () => {
        showDialog(
          "You were disconnected",
          "The session was closed by the server.",
          {
            callback: () => {
              window.onbeforeunload = null;
              location.reload();
            }
          }
        );
      });
      return new Promise((res) => {
        this.ws.addEventListener(
          "open",
          () => {
            res();
          },
          { once: true }
        );
      });
    }
    isOpen() {
      return this.ws !== null;
    }
    sendMsg(type, data) {
      this.ws.send(JSON.stringify({ type, data }));
    }
    on(type, callback, once = false) {
      if (!this.listener.has(type)) {
        this.listener.set(type, []);
      }
      const id = this.listenerId++;
      this.listener.get(type).push({ callback, once, id });
      return id;
    }
    once(type, callback) {
      return this.on(type, callback, true);
    }
    callListeners(type, data) {
      const listeners = this.listener.get(type);
      if (!listeners) {
        return;
      }
      [...listeners].forEach((l, i) => {
        l.callback(data);
        if (l.once) {
          listeners.splice(i, 1);
        }
      });
    }
    off(type, id) {
      const listeners = this.listener.get(type);
      if (!listeners) {
        return;
      }
      const idx = listeners.findIndex((o) => o.id === id);
      if (idx > -1) {
        listeners.splice(idx, 1);
      }
    }
    handleMessage(type, data) {
      switch (type) {
        case "me" /* ME */:
          this.callListeners(
            "me" /* ME */,
            data
          );
          break;
        case "me.game.left" /* ME_LEFT_GAME */:
          this.callListeners(
            "me.game.left" /* ME_LEFT_GAME */,
            data
          );
          break;
        case "game.status" /* GAME_STATUS */:
          this.callListeners(
            "game.status" /* GAME_STATUS */,
            data
          );
          break;
        case "game.playerlist" /* GAME_PLAYERLIST */:
          this.callListeners(
            "game.playerlist" /* GAME_PLAYERLIST */,
            data
          );
          break;
        case "game.settings" /* GAME_SETTINGS */:
          this.callListeners(
            "game.settings" /* GAME_SETTINGS */,
            data
          );
          break;
        case "game.question" /* GAME_QUESTION */:
          this.callListeners(
            "game.question" /* GAME_QUESTION */,
            data
          );
          break;
        case "game.question.active" /* GAME_QUESTION_ACTIVE */:
          this.callListeners(
            "game.question.active" /* GAME_QUESTION_ACTIVE */,
            data
          );
          break;
        case "game.question.answers" /* GAME_QUESTION_ANSWERS */:
          this.callListeners(
            "game.question.answers" /* GAME_QUESTION_ANSWERS */,
            data
          );
          break;
        case "game.question.reset.timeout" /* GAME_QUESTION_RESET_TIMEOUT */:
          this.callListeners(
            "game.question.reset.timeout" /* GAME_QUESTION_RESET_TIMEOUT */,
            data
          );
          break;
        case "generic.error" /* ERROR */:
          this.callListeners(
            "generic.error" /* ERROR */,
            data
          );
          break;
        default:
          throw Error("Not yet implemented" + type);
      }
    }
  };
  var socket = new Socket();

  // quiz/common/utils/animehelper.ts
  function getQuestionNameById(qId) {
    switch (qId) {
      case "animeFromChar" /* ANIME_FROM_CHAR */:
        return "Guess anime title by character";
      case "animeGenre" /* ANIME_GENRE */:
        return "Guess the anime's genre";
      case "animeStudio" /* ANIME_STUDIO */:
        return "Guess the anime's studio";
      case "charByPicture" /* CHAR_BY_PICTURE */:
        return "Guess character from picture";
      case "animeOpening" /* ANIME_OPENING */:
        return "BETA: Guess anime from opening";
      default:
        throw Error("Id not recognized: " + qId);
    }
  }

  // quiz/client/src/screens/question.ts
  var import_escape_html = __toESM(require_escape_html(), 1);

  // node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/lodash-es/_arrayMap.js
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var arrayMap_default = arrayMap;

  // node_modules/lodash-es/isArray.js
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/lodash-es/isObject.js
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/lodash-es/isFunction.js
  var asyncTag = "[object AsyncFunction]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject_default(value)) {
      return false;
    }
    var tag = baseGetTag_default(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var isFunction_default = isFunction;

  // node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/lodash-es/_isMasked.js
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/lodash-es/_toSource.js
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var toSource_default = toSource;

  // node_modules/lodash-es/_baseIsNative.js
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype;
  var objectProto3 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto3.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject_default(value) || isMasked_default(value)) {
      return false;
    }
    var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value));
  }
  var baseIsNative_default = baseIsNative;

  // node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/lodash-es/_WeakMap.js
  var WeakMap = getNative_default(root_default, "WeakMap");
  var WeakMap_default = WeakMap;

  // node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var isIndex_default = isIndex;

  // node_modules/lodash-es/isLength.js
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  var isLength_default = isLength;

  // node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/lodash-es/_isPrototype.js
  var objectProto4 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto4;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/lodash-es/_baseIsArguments.js
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/lodash-es/isArguments.js
  var objectProto5 = Object.prototype;
  var hasOwnProperty3 = objectProto5.hasOwnProperty;
  var propertyIsEnumerable = objectProto5.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(function() {
    return arguments;
  }()) ? baseIsArguments_default : function(value) {
    return isObjectLike_default(value) && hasOwnProperty3.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments_default = isArguments;

  // node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/lodash-es/isBuffer.js
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/lodash-es/_baseIsTypedArray.js
  var argsTag2 = "[object Arguments]";
  var arrayTag = "[object Array]";
  var boolTag = "[object Boolean]";
  var dateTag = "[object Date]";
  var errorTag = "[object Error]";
  var funcTag2 = "[object Function]";
  var mapTag = "[object Map]";
  var numberTag = "[object Number]";
  var objectTag = "[object Object]";
  var regexpTag = "[object RegExp]";
  var setTag = "[object Set]";
  var stringTag = "[object String]";
  var weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]";
  var dataViewTag = "[object DataView]";
  var float32Tag = "[object Float32Array]";
  var float64Tag = "[object Float64Array]";
  var int8Tag = "[object Int8Array]";
  var int16Tag = "[object Int16Array]";
  var int32Tag = "[object Int32Array]";
  var uint8Tag = "[object Uint8Array]";
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  var uint16Tag = "[object Uint16Array]";
  var uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
  }
  var baseIsTypedArray_default = baseIsTypedArray;

  // node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/lodash-es/_nodeUtil.js
  var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess = moduleExports2 && freeGlobal_default.process;
  var nodeUtil = function() {
    try {
      var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeUtil_default = nodeUtil;

  // node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/lodash-es/_arrayLikeKeys.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty4.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex_default(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var arrayLikeKeys_default = arrayLikeKeys;

  // node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/lodash-es/_nativeKeys.js
  var nativeKeys = overArg_default(Object.keys, Object);
  var nativeKeys_default = nativeKeys;

  // node_modules/lodash-es/_baseKeys.js
  var objectProto7 = Object.prototype;
  var hasOwnProperty5 = objectProto7.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype_default(object)) {
      return nativeKeys_default(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty5.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeys_default = baseKeys;

  // node_modules/lodash-es/keys.js
  function keys(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default = keys;

  // node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/lodash-es/_DataView.js
  var DataView = getNative_default(root_default, "DataView");
  var DataView_default = DataView;

  // node_modules/lodash-es/_Promise.js
  var Promise2 = getNative_default(root_default, "Promise");
  var Promise_default = Promise2;

  // node_modules/lodash-es/_Set.js
  var Set = getNative_default(root_default, "Set");
  var Set_default = Set;

  // node_modules/lodash-es/_getTag.js
  var mapTag2 = "[object Map]";
  var objectTag2 = "[object Object]";
  var promiseTag = "[object Promise]";
  var setTag2 = "[object Set]";
  var weakMapTag2 = "[object WeakMap]";
  var dataViewTag2 = "[object DataView]";
  var dataViewCtorString = toSource_default(DataView_default);
  var mapCtorString = toSource_default(Map_default);
  var promiseCtorString = toSource_default(Promise_default);
  var setCtorString = toSource_default(Set_default);
  var weakMapCtorString = toSource_default(WeakMap_default);
  var getTag = baseGetTag_default;
  if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
    getTag = function(value) {
      var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag2;
          case mapCtorString:
            return mapTag2;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag2;
          case weakMapCtorString:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  var getTag_default = getTag;

  // node_modules/lodash-es/_mapToArray.js
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  var mapToArray_default = mapToArray;

  // node_modules/lodash-es/_baseToPairs.js
  function baseToPairs(object, props) {
    return arrayMap_default(props, function(key) {
      return [key, object[key]];
    });
  }
  var baseToPairs_default = baseToPairs;

  // node_modules/lodash-es/_setToPairs.js
  function setToPairs(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }
  var setToPairs_default = setToPairs;

  // node_modules/lodash-es/_createToPairs.js
  var mapTag3 = "[object Map]";
  var setTag3 = "[object Set]";
  function createToPairs(keysFunc) {
    return function(object) {
      var tag = getTag_default(object);
      if (tag == mapTag3) {
        return mapToArray_default(object);
      }
      if (tag == setTag3) {
        return setToPairs_default(object);
      }
      return baseToPairs_default(object, keysFunc(object));
    };
  }
  var createToPairs_default = createToPairs;

  // node_modules/lodash-es/toPairs.js
  var toPairs = createToPairs_default(keys_default);
  var toPairs_default = toPairs;

  // quiz/client/src/screens/screen.ts
  var activeScreen = null;
  var screenStack = [];
  var DOMScreen = class {
    constructor() {
      this.killWhenInactive = true;
      this.additionalClasses = [];
      this.globalDropdownOptions = null;
    }
    setup() {
      this.domRef = document.createElement("div");
      this.domRef.classList.add("screen", ...this.additionalClasses);
      this.domRef.setAttribute("data-screen-active", "next");
    }
    render() {
      this.domRef.innerHTML = this.template();
      document.body.querySelector(".screen-container").appendChild(this.domRef);
    }
    template() {
      return ``;
    }
    setActive(direction = "right", asOverlay) {
      let transition = "cur-none";
      switch (direction) {
        case "left":
          transition = "cur-left";
          break;
        case "right":
          transition = "cur";
          break;
        case "fade":
          transition = "cur-fade";
          break;
      }
      DOMScreen.pushScreenStack(this);
      document.dispatchEvent(new CustomEvent("screenChanged"));
      if (asOverlay) {
        this.domRef.setAttribute("data-screen-active", transition);
        this.domRef.setAttribute("data-screen-overlay", "true");
        return;
      }
      if (activeScreen) {
        activeScreen.setInactive(direction);
      }
      this.domRef.setAttribute("data-screen-active", transition);
      activeScreen = this;
    }
    setInactive(direction = "right") {
      let transition = "prev-none";
      switch (direction) {
        case "left":
          transition = "prev-left";
          break;
        case "right":
          transition = "prev";
          break;
        case "fade":
          transition = "prev-fade";
          break;
      }
      this.domRef.setAttribute("data-screen-active", transition);
      if (this.killWhenInactive) {
        this.die();
      }
      DOMScreen.popScreenStack(this);
      document.dispatchEvent(new CustomEvent("screenChanged"));
    }
    die() {
      if (activeScreen === this) {
        activeScreen = null;
      }
      window.setTimeout(() => {
        this.domRef.remove();
      }, 1e3);
    }
    static spawnScreen(s) {
      s.setup();
      s.render();
      s.init();
      return s;
    }
    static pushScreenStack(screen) {
      DOMScreen.popScreenStack(screen);
      screenStack.push(screen);
    }
    static popScreenStack(screen) {
      if (screenStack.includes(screen)) {
        screenStack.splice(screenStack.indexOf(screen), 1);
      }
    }
    static getCurrentScreen() {
      return screenStack.at(-1);
    }
  };

  // quiz/client/src/screens/settings.ts
  var SettingsScreen = class extends DOMScreen {
    constructor() {
      super();
      this.killWhenInactive = false;
      this.additionalClasses = ["gradient-bg-screen"];
      this.languagePreferences = [
        "Official" /* OFFICIAL */,
        "Shortest" /* SHORTEST */,
        "English" /* ENGLISH */,
        "Japanese" /* JAPANESE */,
        "German" /* GERMAN */,
        "Spanish" /* SPANISH */,
        "French" /* FRENCH */
      ];
    }
    init() {
      this.domRef.querySelector("#settings-close").addEventListener("click", (e) => {
        this.setInactive("fade");
      });
      const form = this.domRef.querySelector("form");
      form.addEventListener("input", (e) => {
        const elements = form.elements;
        const animeTitleLanguage = elements.namedItem("anime-title-language").value;
        const secondaryLanguage = elements.namedItem("secondary-title-language").value;
        const showReverseTimer = elements.namedItem("showReverseTimer").checked;
        globalSettings.languagePreference = animeTitleLanguage;
        globalSettings.secondaryLanguagePreference = secondaryLanguage;
        globalSettings.showReverseTimer = showReverseTimer;
      });
    }
    setActive() {
      super.setActive("fade", true);
    }
    template() {
      return `
    <div class="title-bar">
      <h1 class="title-h1">SETTINGS</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="general">General</div>
        <!--<div class="tab-menu-entry" data-target-tab="audio">Audio</div>-->
      </div>
      <div class="title-bar-spacer"></div>
    </div>

    <section class="content-wrapper" data-tab="general">
      <div class="container-wrapper">
        <form class="list">
          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Title Language Preference</span>
              <select name="anime-title-language">
                ${this.languagePreferences.map(
        (l) => `<option 
                      value="${l}" 
                      ${globalSettings.languagePreference === l ? "selected" : ""}>${l}</option>`
      )}
              </select>
            </div>
          </div>

          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Secondary Language Preference</span>
              <select name="secondary-title-language">
                ${this.languagePreferences.map(
        (l) => `<option 
                      value="${l}" 
                      ${globalSettings.secondaryLanguagePreference === l ? "selected" : ""}>${l}</option>`
      )}
              </select>
            </div>
          </div>

          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Show Reverse Timer when loading next question</span>
              <input type="checkbox" 
                name="showReverseTimer" 
                ${globalSettings.showReverseTimer ? "checked" : ""}>
            </div>
          </div>

        </form>
      </div>
    </section>
    
    <div class="bottom-container" data-tab="general">
      <input type="button" class="button button-outline" id="settings-close" value="Back">
    </div>`;
    }
  };

  // quiz/client/src/globalSettings.ts
  var defaultSettings = {
    volume: 1,
    languagePreference: "Official" /* OFFICIAL */,
    secondaryLanguagePreference: "Official" /* OFFICIAL */,
    showReverseTimer: false
  };
  var _a;
  var settings = __spreadValues(__spreadValues({}, defaultSettings), JSON.parse((_a = localStorage.getItem("settings")) != null ? _a : "{}"));
  var globalSettings = new Proxy(settings, {
    set(obj, prop, val) {
      obj[prop] = val;
      try {
        localStorage.setItem("settings", JSON.stringify(obj));
      } catch (_) {
      }
      document.dispatchEvent(
        new CustomEvent("globalSettingsChanged", {
          detail: obj
        })
      );
      return true;
    }
  });
  var settingsDOM = document.querySelector(".settings-overlay");
  var dropdown = settingsDOM.querySelector(".settings-dropdown");
  var menuButton = settingsDOM.querySelector(".settings-button");
  var settingsScreen = DOMScreen.spawnScreen(new SettingsScreen());
  document.addEventListener("click", (e) => {
    var _a2;
    const target = e.target;
    if (target === menuButton) {
      dropdown.toggleAttribute("data-active");
      return;
    }
    if (dropdown.contains(target)) {
      const link = target.closest("[data-link]");
      if (!link) {
        return;
      }
      switch (link.getAttribute("data-link")) {
        case "settings-screen":
          settingsScreen.setActive();
          break;
        case "_additional":
          const id = parseInt(link.getAttribute("data-link-id"));
          const screen = DOMScreen.getCurrentScreen();
          if (screen.globalDropdownOptions) {
            (_a2 = screen.globalDropdownOptions[id]) == null ? void 0 : _a2.callback();
          }
          break;
      }
    }
    dropdown.toggleAttribute("data-active", false);
  });
  document.addEventListener("screenChanged", (e) => {
    renderGlobalSettings();
  });
  function renderGlobalSettings() {
    const additionalEntries = [];
    const screen = DOMScreen.getCurrentScreen();
    if (screen.globalDropdownOptions) {
      additionalEntries.push(...screen.globalDropdownOptions);
    }
    dropdown.innerHTML = `
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${globalSettings.volume * 100}">
  </div>
  <div class="settings-dropdown-entry" data-link="settings-screen">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    Settings
  </div>
  ${additionalEntries.map(
      (e, idx) => `
    <div class="settings-dropdown-entry" data-link="_additional" data-link-id="${idx}">
      <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${e.svgPath}</svg>
      ${e.title}
    </div>`
    )}`;
    settingsDOM.querySelector("#setting-audio-volume").addEventListener("input", (e) => {
      globalSettings.volume = parseInt(e.target.value) / 100;
    });
  }

  // quiz/client/src/utils/titles.ts
  function renderAnimeTitle(titles, secondary = false) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    if (typeof titles === "string") {
      return titles;
    }
    const defaultTitle = (_b = (_a2 = titles.find((t) => t.type === "Default" /* DEFAULT */)) == null ? void 0 : _a2.title) != null ? _b : titles.at(0).title;
    let languageSetting = globalSettings.languagePreference;
    if (secondary) {
      languageSetting = globalSettings.secondaryLanguagePreference;
    }
    switch (languageSetting) {
      case "Official" /* OFFICIAL */:
        return defaultTitle;
        break;
      case "Shortest" /* SHORTEST */:
        return (_d = (_c = titles.filter(
          (t) => ["Default" /* DEFAULT */, "Synonym" /* SYNONYM */].includes(t.type)
        ).sort((a, b) => a.title.length - b.title.length).at(0)) == null ? void 0 : _c.title) != null ? _d : defaultTitle;
        break;
      case "English" /* ENGLISH */:
        return (_f = (_e = titles.find((t) => t.type === "English" /* ENGLISH */)) == null ? void 0 : _e.title) != null ? _f : defaultTitle;
        break;
      case "Japanese" /* JAPANESE */:
        return (_h = (_g = titles.find((t) => t.type === "Japanese" /* JAPANESE */)) == null ? void 0 : _g.title) != null ? _h : defaultTitle;
        break;
      case "German" /* GERMAN */:
        return (_j = (_i = titles.find((t) => t.type === "German" /* GERMAN */)) == null ? void 0 : _i.title) != null ? _j : defaultTitle;
        break;
      case "Spanish" /* SPANISH */:
        return (_l = (_k = titles.find((t) => t.type === "Spanish" /* SPANISH */)) == null ? void 0 : _k.title) != null ? _l : defaultTitle;
        break;
      case "French" /* FRENCH */:
        return (_n = (_m = titles.find((t) => t.type === "French" /* FRENCH */)) == null ? void 0 : _m.title) != null ? _n : defaultTitle;
        break;
    }
    return defaultTitle;
  }
  function renderTemplate(template) {
    var _a2;
    const data = (_a2 = template == null ? void 0 : template.data) != null ? _a2 : {};
    return template.template.map((s) => {
      const value = data[s];
      if (!value) {
        return s;
      }
      if (typeof value === "string") {
        return value;
      }
      return renderAnimeTitle(value);
    }).join("");
  }
  var canvasContext = document.createElement("canvas").getContext("2d");
  function calcStringWidth(str, font = "800 22px Fira Sans, sans-serif") {
    canvasContext.font = font;
    return Math.ceil(canvasContext.measureText(str).width);
  }

  // quiz/client/src/screens/question.ts
  var QuestionScreen = class extends DOMScreen {
    constructor(lobby, questionId, question) {
      super();
      this.globalDropdownOptions = [
        {
          svgPath: `<path d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" />`,
          title: "Leave Session",
          callback: this.leaveGameGuarded.bind(this)
        }
      ];
      this.questionId = null;
      this.ownAnwser = null;
      this.timerReverse = false;
      this.questionDone = false;
      this.lobby = lobby;
      this.questionId = questionId;
      this.question = question;
      this.timeoutMs = this.question.timeoutMs;
    }
    init() {
      this.domRef.addEventListener("click", (e) => {
        const elem = e.target.closest("[data-answer]");
        if (elem === null) {
          return;
        }
        if (this.questionDone) {
          return;
        }
        if (this.ownAnwser !== null && this.lobby.getSetting("allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */) === false) {
          return;
        }
        const val = elem.getAttribute("data-answer");
        this.ownAnwser = parseInt(val);
        socket.sendMsg("game.question.answer" /* GAME_QUESTION_ANSWER */, {
          questionId: this.questionId,
          answer: this.ownAnwser
        });
        this.domRef.querySelectorAll("[data-answer-selected=true]").forEach((e2) => {
          e2.removeAttribute("data-answer-selected");
        });
        elem.setAttribute("data-answer-selected", "true");
      });
      this.resetTimeoutListener = socket.on(
        "game.question.reset.timeout" /* GAME_QUESTION_RESET_TIMEOUT */,
        ({ id, timeoutMs, reverse }) => {
          if (this.questionId !== id) {
            return;
          }
          this.timeoutMs = timeoutMs;
          this.timerStarted = Date.now();
          this.timerReverse = reverse;
          console.log("reset timer");
        }
      );
      if (this.question.question.audioUrl) {
        this.audio = new Audio(this.question.question.audioUrl);
        this.audio.preload = "auto";
        this.audio.autoplay = false;
        this.audio.volume = globalSettings.volume;
        document.addEventListener(
          "globalSettingsChanged",
          this.settingsChanged.bind(this)
        );
      }
      const answerContainers = this.domRef.querySelectorAll(".answers > li");
      answerContainers.forEach((a) => {
        const containerWidth = a.getBoundingClientRect().width - 80;
        const stringWidth = calcStringWidth(a.getAttribute("data-str-val"));
        a.style.fontSize = `${Math.floor(
          Math.min(Math.max(22 * (containerWidth / stringWidth), 16), 22)
        )}px`;
      });
      this.timerDOM = this.domRef.querySelector(".question-timer");
    }
    setActive() {
      super.setActive();
      this.timerStarted = Date.now();
      if (this.audio) {
        this.audio.play();
      }
      window.requestAnimationFrame(() => {
        this.updateTimer();
      });
    }
    settingsChanged(e) {
      this.audio.volume = e.detail.volume;
    }
    updateTimer() {
      if (this.questionDone && !globalSettings.showReverseTimer) {
        this.timerDOM.style.transform = `scaleX(0)`;
        return;
      }
      const timeoutMs = this.timeoutMs - 250;
      const timeLeftSeconds = Math.ceil(
        (this.timerStarted + timeoutMs - Date.now()) / 1e3
      );
      let timePercentage = Math.max(
        1 - (Date.now() - this.timerStarted) / timeoutMs,
        0
      );
      if (this.timerReverse) {
        timePercentage = 1 - timePercentage;
      }
      this.timerDOM.style.transform = `scaleX(${timePercentage})`;
      window.requestAnimationFrame(() => {
        this.updateTimer();
      });
    }
    showAnswers(answers, playerAnswers) {
      const { correct, wrong } = answers;
      const otherAnswers = toPairs_default(playerAnswers);
      correct.forEach((a) => {
        this.domRef.querySelector(`li[data-answer="${a}"]`).setAttribute("data-answer-correct", "true");
      });
      if (wrong.includes(this.ownAnwser)) {
        this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct", "false");
      }
      if (this.question.question.image) {
        const img = this.domRef.querySelector(".question-image");
        img.removeAttribute("data-blurred");
      }
      otherAnswers.forEach(([playerId, answerId]) => {
        const playerName = this.lobby.getPlayerEntryById(playerId).name;
        const answerContainer = this.domRef.querySelector(
          `li[data-answer="${answerId}"] > .answer-others-container`
        );
        const tag = document.createElement("div");
        tag.classList.add("answer-others", "skewed-tag");
        tag.innerHTML = `<span>${playerName}</span>`;
        answerContainer.appendChild(tag);
      });
      this.questionDone = true;
    }
    leaveGameGuarded() {
      showDialog(
        "Are you sure?",
        "You cannot join again as long as the game is running.",
        {
          actions: [
            {
              class: "button-outline",
              title: "Cancel",
              value: "cancel"
            },
            {
              class: "button-error",
              title: "Leave Game",
              value: "leave"
            }
          ],
          callback: (val) => {
            if (val === "leave") {
              socket.sendMsg("game.leave" /* GAME_LEAVE */);
            }
          }
        }
      );
    }
    setInactive(direction) {
      super.setInactive(direction);
      this.questionDone = true;
      if (this.audio) {
        this.audio.pause();
        this.audio.remove();
      }
    }
    die() {
      super.die();
      document.removeEventListener("globalSettingsChanged", this.settingsChanged);
      socket.off(
        "game.question.reset.timeout" /* GAME_QUESTION_RESET_TIMEOUT */,
        this.resetTimeoutListener
      );
    }
    template() {
      const question = this.question.question;
      const answers = this.question.answers;
      const hasImage = this.question.question.image ? true : false;
      const hasAudio = this.question.question.audioUrl ? true : false;
      return `
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId + 1}</div>
        ${hasImage ? `<div class="question-image-container">
            <img class="question-image" ${question.imageBlurred ? "data-blurred=true" : ""} src="${(0, import_escape_html.default)(question.image)}">
            </div>` : ""}
        <div class="question-title title-h3">${(0, import_escape_html.default)(
        renderTemplate(question.title)
      )}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${answers.map((a, idx) => {
        const str = (0, import_escape_html.default)(renderAnimeTitle(a));
        const secondaryTitle = (0, import_escape_html.default)(renderAnimeTitle(a, true));
        const secondaryIsSame = secondaryTitle.toLowerCase() === str.toLowerCase();
        return `<li data-answer="${idx}" data-str-val="${str}">
            <div>
              ${str}
              ${!secondaryIsSame ? `<span class="secondary-answer">${secondaryTitle}</span>` : ""}
            </div>
            <div class="answer-others-container"></div>
          </li>`;
      }).join("")}
      </ul>
    </div>`;
    }
  };

  // quiz/client/src/screens/lobby.ts
  var LobbyScreen = class extends DOMScreen {
    constructor() {
      super();
      this.killWhenInactive = false;
      this.additionalClasses = ["gradient-bg-screen"];
      this.currentLobbyStatus = null;
      this.lobbyId = "";
      this.selfReady = false;
      this.playerlist = [];
      this.questions = /* @__PURE__ */ new Map();
    }
    init() {
      this.readyButton = this.domRef.querySelector(
        "#lobby-ready"
      );
      const copyIdButton = this.domRef.querySelector(
        "#copy-lobby-id"
      );
      this.lobbySettingsDom = this.domRef.querySelector(
        ".lobby-settings"
      );
      const backToJoinButton = this.domRef.querySelector(
        "#lobby-back-button"
      );
      this.keyDownListener = this.keydown.bind(this);
      this.keyUpListener = this.keyup.bind(this);
      document.addEventListener("keydown", this.keyDownListener);
      document.addEventListener("keyup", this.keyUpListener);
      const playerListDom = this.domRef.querySelector(".lobby-playerlist");
      this.scoreboardDom = document.createElement("div");
      this.scoreboardDom.classList.add("playerlist", "playerlist-scoreboard");
      this.statusListener = socket.on(
        "game.status" /* GAME_STATUS */,
        ({ id, status }) => {
          this.lobbyId = id;
          this.domRef.querySelector("#lobby-id").innerHTML = id;
          if (this.currentLobbyStatus && this.currentLobbyStatus !== status) {
            switch (status) {
              case "IN_GAME" /* IN_GAME */:
                break;
              case "LOBBY" /* LOBBY */:
                if (this.scoreboardCloseCallback) {
                  this.scoreboardCloseCallback();
                  this.scoreboardCloseCallback = null;
                }
                showDialog("Final Scoreboard", void 0, {
                  actions: [
                    {
                      title: "Back to Lobby",
                      value: "back",
                      class: "button-outline"
                    }
                  ],
                  alternativeContentDom: this.scoreboardDom,
                  callback: () => {
                    this.setActive();
                  }
                });
                break;
            }
          }
          this.currentLobbyStatus = status;
          this.updateReadyButton();
        }
      );
      this.playerlistListener = socket.on(
        "game.playerlist" /* GAME_PLAYERLIST */,
        ({ playerlist, host }) => {
          this.playerlist = playerlist;
          this.lobbyHost = this.playerlist.find((e) => e.playerId === host);
          const dummyFiller = new Array(
            Math.max(6 - this.playerlist.length, 0)
          ).fill(true);
          const playerListHTML = [...this.playerlist].map(
            (e) => `<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <div class="player-name">
                    <span>${e.name}</span>
                    <div class="player-icons">
                      ${e === this.lobbyHost ? `<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>Lobby Host</title><path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" /></svg>` : ""}
                    </div>
                  </div>
                  ${e.ready ? `<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>` : `<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>`}
                </div>
                <div class="list-row-entry player-row-more">
                  <div 
                    class="player-more-button" 
                    title="Show options"
                    data-player-id="${e.playerId}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                    </svg>
                  </div>
                </div>
              </li>`
          ).join("");
          const dummyHTML = dummyFiller.map(
            (e) => `<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`
          ).join("");
          playerListDom.innerHTML = playerListHTML + dummyHTML;
          this.scoreboardDom.innerHTML = [...this.playerlist].sort((a, b) => b.score - a.score).map(
            (e) => `<li class="playerlist-entry">
                ${e.name}
                <div class="skewed-tag ${e.playerId === globalState.me.id ? "skewed-tag-primary" : ""} tag-score">${e.score}</div>
              </li>`
          ).join("");
          const self2 = playerlist.find((e) => e.playerId === globalState.me.id);
          this.selfReady = self2 == null ? void 0 : self2.ready;
          this.updateReadyButton();
          this.updateSaveSettingsButton();
        }
      );
      this.gameSettingsListener = socket.on(
        "game.settings" /* GAME_SETTINGS */,
        ({ currentSettings, availableQuestions }) => {
          this.currentSettings = currentSettings;
          this.renderSettings(currentSettings, availableQuestions);
          document.querySelector("#lobby-dd-question-amount").innerHTML = `${currentSettings["questionCount" /* QUESTION_COUNT */]}`;
          document.querySelector("#lobby-dd-answer-switching").innerHTML = currentSettings["allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */] ? "YES" : "NO";
          const timeoutMode = currentSettings["answerTimeout" /* ANSWER_TIMEOUT_MODE */];
          let timeoutModeStr = "";
          switch (timeoutMode) {
            case "alwaysTimeout" /* ALWAYS_TIMEOUT */:
              timeoutModeStr = "Always wait";
              break;
            case "firstAnswer" /* WAIT_FIRST_ANSWER */:
              timeoutModeStr = "First Answer";
              break;
            case "playersOrTimeout" /* WAIT_PLAYERS_OR_TIMEOUT */:
              timeoutModeStr = "Wait for All";
              break;
            default:
              timeoutModeStr = "???";
              break;
          }
          document.querySelector("#lobby-dd-timeout-mode").innerHTML = timeoutModeStr;
          document.querySelector("#lobby-dd-score-penalty").innerHTML = currentSettings["wrongAnswerPenalty" /* WRONG_ANSER_PENALTY */] ? "YES" : "NO";
        }
      );
      this.questionListener = socket.on(
        "game.question" /* GAME_QUESTION */,
        ({ id, question }) => {
          const screen = DOMScreen.spawnScreen(
            new QuestionScreen(this, id, question)
          );
          this.questions.set(id, screen);
        }
      );
      this.questionActiveListener = socket.on(
        "game.question.active" /* GAME_QUESTION_ACTIVE */,
        ({ id }) => {
          const q = this.questions.get(id);
          q.setActive();
        }
      );
      this.questionAnswersListener = socket.on(
        "game.question.answers" /* GAME_QUESTION_ANSWERS */,
        ({ id, answers, playerAnswers }) => {
          const q = this.questions.get(id);
          q.showAnswers(answers, playerAnswers);
        }
      );
      this.selfLeftListener = socket.on(
        "me.game.left" /* ME_LEFT_GAME */,
        ({ reason }) => {
          this.leaveLobby();
          if (reason === "KICKED_INACTIVITY" /* KICKED_INACTIVITY */) {
            showDialog(
              "You were kicked",
              "You were kicked from the game due to inactivity."
            );
          }
        }
      );
      this.readyButton.addEventListener("click", (e) => {
        this.selfReady = !this.selfReady;
        socket.sendMsg("me.ready" /* ME_READY */, { ready: this.selfReady });
        this.updateReadyButton();
      });
      copyIdButton.addEventListener("click", (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(location.href);
      });
      const tabs = this.domRef.querySelectorAll("[data-tab]");
      const tabMenu = this.domRef.querySelector(".tab-menu");
      tabMenu.addEventListener("click", (e) => {
        e.preventDefault();
        const domElem = e.target;
        const targetTab = domElem.getAttribute("data-target-tab");
        if (!targetTab) {
          return;
        }
        tabMenu.querySelector("[data-active=true]").removeAttribute("data-active");
        domElem.setAttribute("data-active", "true");
        tabs.forEach((t) => {
          t.setAttribute("data-inactive", "true");
          if (t.getAttribute("data-tab") === targetTab) {
            t.removeAttribute("data-inactive");
          }
        });
      });
      backToJoinButton.addEventListener("click", (e) => {
        e.preventDefault();
        socket.sendMsg("game.leave" /* GAME_LEAVE */);
      });
      this.lobbySettingsDom.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitSettings();
      });
      this.settingsSubmitButton = this.domRef.querySelector(
        ".button[name=update-settings]"
      );
      this.lobbySettingsDom.addEventListener("input", (e) => {
        e.preventDefault();
        if (!this.selfIsHost()) {
          this.lobbySettingsDom.reset();
          return;
        }
        this.settingsSubmitButton.setAttribute("data-active", "true");
      });
      playerListDom.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        const closestMore = target.closest(".player-more-button");
        if (!closestMore) {
          return;
        }
        const playerId = closestMore.getAttribute("data-player-id");
        const playerEntry = this.playerlist.find((e2) => e2.playerId === playerId);
        if (!playerEntry) {
          console.error("something went terribly wrong, idk how!");
          return;
        }
        if (this.lobbyHost.playerId !== globalState.me.id) {
          showDialog(
            "You're not the host.",
            "Only the host can interact with this."
          );
          return;
        }
        showDialog(playerEntry.name, "", {
          actions: [
            {
              title: "Cancel",
              class: "button-outline",
              value: "cancel"
            },
            {
              title: "Kick",
              class: "button-error",
              value: "kick"
            },
            {
              title: "Make Host",
              class: "button-primary",
              value: "makehost"
            }
          ],
          callback: (v) => {
            switch (v) {
              case "kick":
                showDialog("Work in Progress", "kekw");
                break;
              case "makehost":
                socket.sendMsg("game.change.host" /* GAME_CHANGE_HOST */, {
                  newHost: playerEntry.playerId
                });
                break;
            }
          }
        });
      });
    }
    renderSettings(settings2, availableQuestions) {
      const gameplayEntries = [
        {
          label: "No. of Questions",
          inputs: [
            {
              value: settings2["questionCount" /* QUESTION_COUNT */],
              name: "questionCount" /* QUESTION_COUNT */,
              type: "number",
              min: 3,
              max: 50
            }
          ]
        },
        {
          label: "Allow to Switch Answer",
          inputs: [
            {
              value: settings2["allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */],
              checked: settings2["allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */],
              name: "allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */,
              type: "checkbox"
            }
          ]
        },
        {
          label: "Question Timeout Mode",
          inputs: [
            {
              value: settings2["answerTimeout" /* ANSWER_TIMEOUT_MODE */],
              name: "answerTimeout" /* ANSWER_TIMEOUT_MODE */,
              type: "select",
              options: [
                {
                  value: "playersOrTimeout" /* WAIT_PLAYERS_OR_TIMEOUT */,
                  label: "Normal (Wait for all players)"
                },
                {
                  value: "alwaysTimeout" /* ALWAYS_TIMEOUT */,
                  label: "Always wait for timeout"
                },
                {
                  value: "firstAnswer" /* WAIT_FIRST_ANSWER */,
                  label: "Timeout after first answer"
                }
              ]
            }
          ]
        },
        {
          label: "Additional Timeout After Answer",
          inputs: [
            {
              value: settings2["secAfterAnswer" /* SECONDS_AFTER_ANSWER */],
              name: "secAfterAnswer" /* SECONDS_AFTER_ANSWER */,
              type: "number",
              min: 0,
              max: 15
            }
          ]
        },
        {
          label: "Score Penalty on Wrong Answer",
          inputs: [
            {
              value: settings2["wrongAnswerPenalty" /* WRONG_ANSER_PENALTY */],
              checked: settings2["wrongAnswerPenalty" /* WRONG_ANSER_PENALTY */],
              name: "wrongAnswerPenalty" /* WRONG_ANSER_PENALTY */,
              type: "checkbox"
            }
          ]
        }
      ];
      const filterEntries = [
        {
          label: "Popularity",
          inputs: [
            {
              value: settings2["minPopularity" /* MIN_POPULARITY */],
              name: "minPopularity" /* MIN_POPULARITY */,
              type: "number",
              min: -1,
              max: 1e4
            },
            {
              value: settings2["maxPopularity" /* MAX_POPULARITY */],
              name: "maxPopularity" /* MAX_POPULARITY */,
              type: "number",
              min: -1,
              max: 1e4
            }
          ]
        },
        {
          label: "Year",
          inputs: [
            {
              value: settings2["minYear" /* MIN_YEAR */],
              name: "minYear" /* MIN_YEAR */,
              type: "number",
              min: -1,
              max: 1e4
            },
            {
              value: settings2["maxYear" /* MAX_YEAR */],
              name: "maxYear" /* MAX_YEAR */,
              type: "number",
              min: -1,
              max: 1e4
            }
          ]
        },
        {
          label: "Main Role Only",
          inputs: [
            {
              value: settings2["mainRoleOnly" /* MAIN_ROLE_ONLY */],
              checked: settings2["mainRoleOnly" /* MAIN_ROLE_ONLY */],
              name: "mainRoleOnly" /* MAIN_ROLE_ONLY */,
              type: "checkbox"
            }
          ]
        }
      ];
      const gameplaySettings = gameplayEntries.map((e) => {
        return `<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${e.label}</span>
            ${e.inputs.map((i) => {
          switch (i.type) {
            case "select":
              return `<select name="${i.name}">
                    ${i.options.map(
                (o) => `<option 
                        value="${o.value}" 
                        ${o.value === i.value ? "selected" : ""}>
                        ${o.label}
                        </option>`
              )}
                    </select>`;
            default:
              return `<input name="${i.name}" type="${i.type}" 
                    ${i.type !== "checkbox" ? 'style="width:6rem" required' : ""} 
                    value="${i.value}" 
                    ${i.min ? `min="${i.min}"` : ""} 
                    ${i.max ? `max="${i.max}"` : ""} 
                    ${i.checked ? `checked` : ""}>`;
          }
        }).join(" - ")}
          </div>
        </div>`;
      }).join("");
      const filterSettings = filterEntries.map((e) => {
        return `<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${e.label}</span>
            ${e.inputs.map(
          (i) => `<input name="${i.name}" type="${i.type}" 
                  ${i.type !== "checkbox" ? 'style="width:6rem" required' : ""} 
                  value="${i.value}" 
                  ${i.min ? `min="${i.min}"` : ""} 
                  ${i.max ? `max="${i.max}"` : ""} 
                  ${i.checked ? `checked` : ""}>`
        ).join(" - ")}
          </div>
        </div>`;
      }).join("");
      const questionSettings = availableQuestions.map((qId) => {
        return `<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${getQuestionNameById(
          qId
        )}</span>
            <input type="checkbox" id="q_${qId}" 
            name="${"activeQuestions" /* ACTIVE_QUESTIONS */}" 
            value="${qId}" 
            ${settings2["activeQuestions" /* ACTIVE_QUESTIONS */].some((q) => qId === q) ? "checked" : ""}>
          </div>
        </div>`;
      }).join("");
      this.lobbySettingsDom.innerHTML = `
    <div class="list-row list-row-header">Gameplay</div>
    ${gameplaySettings}

    <div class="list-row list-row-header">Filters</div>
    ${filterSettings}
    
    <div class="list-row list-row-header">Questions</div>
    ${questionSettings}`;
      this.settingsSubmitButton.removeAttribute("data-active");
    }
    submitSettings() {
      socket.sendMsg("game.settings" /* GAME_SETTINGS */, {
        settings: {
          ["questionCount" /* QUESTION_COUNT */]: parseInt(
            this.lobbySettingsDom.querySelector(
              `[name="${"questionCount" /* QUESTION_COUNT */}"]`
            ).value
          ),
          ["activeQuestions" /* ACTIVE_QUESTIONS */]: Array.from(
            this.lobbySettingsDom.querySelectorAll(
              `[name="${"activeQuestions" /* ACTIVE_QUESTIONS */}"]:checked`
            )
          ).map((e) => e.value),
          ["mainRoleOnly" /* MAIN_ROLE_ONLY */]: this.lobbySettingsDom.querySelector(
            `[name="${"mainRoleOnly" /* MAIN_ROLE_ONLY */}"]`
          ).checked,
          ["minPopularity" /* MIN_POPULARITY */]: parseInt(
            this.lobbySettingsDom.querySelector(
              `[name="${"minPopularity" /* MIN_POPULARITY */}"]`
            ).value
          ),
          ["maxPopularity" /* MAX_POPULARITY */]: parseInt(
            this.lobbySettingsDom.querySelector(
              `[name="${"maxPopularity" /* MAX_POPULARITY */}"]`
            ).value
          ),
          ["minYear" /* MIN_YEAR */]: parseInt(
            this.lobbySettingsDom.querySelector(
              `[name="${"minYear" /* MIN_YEAR */}"]`
            ).value
          ),
          ["maxYear" /* MAX_YEAR */]: parseInt(
            this.lobbySettingsDom.querySelector(
              `[name="${"maxYear" /* MAX_YEAR */}"]`
            ).value
          ),
          ["allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */]: this.lobbySettingsDom.querySelector(
            `[name="${"allowChangeAnswer" /* ALLOW_CHANGE_ANSWER */}"]`
          ).checked,
          ["answerTimeout" /* ANSWER_TIMEOUT_MODE */]: this.lobbySettingsDom.querySelector(
            `[name="${"answerTimeout" /* ANSWER_TIMEOUT_MODE */}"]`
          ).value,
          ["secAfterAnswer" /* SECONDS_AFTER_ANSWER */]: parseInt(
            this.lobbySettingsDom.querySelector(
              `[name="${"secAfterAnswer" /* SECONDS_AFTER_ANSWER */}"]`
            ).value
          ),
          ["wrongAnswerPenalty" /* WRONG_ANSER_PENALTY */]: this.lobbySettingsDom.querySelector(
            `[name="${"wrongAnswerPenalty" /* WRONG_ANSER_PENALTY */}"]`
          ).checked
        }
      });
    }
    updateReadyButton() {
      this.readyButton.value = this.currentLobbyStatus === "IN_GAME" /* IN_GAME */ ? "GAME STARTING" : this.selfReady ? "NOT Ready" : "READY";
      this.readyButton.setAttribute("data-active", this.selfReady + "");
      this.readyButton.disabled = this.currentLobbyStatus === "IN_GAME" /* IN_GAME */;
    }
    updateSaveSettingsButton() {
      const button = this.domRef.querySelector(
        "#update-settings-button"
      );
      if (this.selfIsHost()) {
        button.value = "Save";
        button.disabled = false;
      } else {
        button.value = "Only host can save";
        button.disabled = true;
      }
    }
    getPlayerEntryById(id) {
      return this.playerlist.find((e) => {
        return e.playerId === id;
      });
    }
    leaveLobby() {
      DOMScreen.spawnScreen(new JoinScreen()).setActive("left");
      this.die();
    }
    selfIsHost() {
      return this.lobbyHost && this.lobbyHost.playerId === globalState.me.id;
    }
    getSetting(setting) {
      var _a2, _b;
      return (_b = (_a2 = this.currentSettings) == null ? void 0 : _a2[setting]) != null ? _b : null;
    }
    template() {
      return `
    <div class="title-bar">
      <h1 class="title-h1">LOBBY</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="overview">Overview</div>
        <!-- <div class="tab-menu-entry" data-target-tab="presets">Presets</div> -->
        <div class="tab-menu-entry" data-target-tab="settings">Settings</div>
      </div>
      <div class="title-bar-spacer"></div>
    </div>

    <section class="content-wrapper" data-tab="overview">
      <div class="multiple-container-wrapper lobby-container-wrapper">

        <div class="container container-translucent lobby-container">
          <div class="title-h3 lobby-title">
            Lobby Code<br>
            <span class="title-h2">
            <span id="lobby-id">${this.lobbyId}</span>&nbsp;
              <a id="copy-lobby-id" title="Copy Link to Lobby" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>

          <dl>
            <dt>No. of Questions</dt>
            <dd id="lobby-dd-question-amount">20</dd>

            <dt>Can Switch Answer</dt>
            <dd id="lobby-dd-answer-switching">NO</dd>

            <dt>Timeout Mode</dt>
            <dd id="lobby-dd-timeout-mode">Normal</dd>

            <dt>Wrong Answer Penalty</dt>
            <dd id="lobby-dd-score-penalty">NO</dd>
          </dl>
        </div>

        <ul class="list lobby-playerlist">
        </ul>

      </div>
    </section>

    <section class="content-wrapper" data-tab="settings" data-inactive="true">
      <div class="container-wrapper">
        <form class="lobby-settings list" id="lobby-settings"></form>
      </div>
    </section>
    
    <section class="content-wrapper" data-tab="presets" data-inactive="true">
      <div class="grid-container-wrapper">
        <div class="container">Hier ist mein Preset und da steht sogar ne megagro\xDFe und ausf\xFChrliche Beschreibung dabei</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
      </div>
    </section>

    <div class="bottom-container" data-tab="overview">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Leave">
      <input type="button" class="button button-primary" id="lobby-ready" value="Ready" disabled=true>
    </div>

    <div class="bottom-container" data-tab="settings" data-inactive="true">
      <input type="submit" class="button button-outline" name="update-settings" id="update-settings-button" form="lobby-settings" value="Save">
    </div>`;
    }
    keydown(event) {
      if (this.currentLobbyStatus !== "IN_GAME" /* IN_GAME */) {
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (event.repeat) {
        return;
      }
      if (this.scoreboardCloseCallback) {
        event.preventDefault();
        this.scoreboardCloseCallback();
        this.scoreboardCloseCallback = null;
      }
      const scoreboardClosePromise = new Promise((res) => {
        this.scoreboardCloseCallback = res;
      });
      showDialog("Scoreboard", void 0, {
        actions: [],
        closeDialogPromise: scoreboardClosePromise,
        alternativeContentDom: this.scoreboardDom
      });
    }
    keyup(event) {
      if (event.key !== "Tab") {
        return;
      }
      if (this.scoreboardCloseCallback) {
        event.preventDefault();
        this.scoreboardCloseCallback();
        this.scoreboardCloseCallback = null;
      }
    }
    setActive(direction, asOverlay) {
      super.setActive(direction, asOverlay);
      location.hash = "#/" + this.lobbyId;
    }
    setInactive(direction) {
      super.setInactive(direction);
      location.hash = "";
    }
    die() {
      super.die();
      socket.off("game.status" /* GAME_STATUS */, this.statusListener);
      socket.off("game.playerlist" /* GAME_PLAYERLIST */, this.playerlistListener);
      socket.off("game.settings" /* GAME_SETTINGS */, this.gameSettingsListener);
      socket.off("game.question" /* GAME_QUESTION */, this.questionListener);
      socket.off(
        "game.question.active" /* GAME_QUESTION_ACTIVE */,
        this.questionActiveListener
      );
      socket.off(
        "game.question.answers" /* GAME_QUESTION_ANSWERS */,
        this.questionAnswersListener
      );
      socket.off("me.game.left" /* ME_LEFT_GAME */, this.selfLeftListener);
      this.questions.forEach((q) => {
        q.die();
      });
      document.removeEventListener("keydown", this.keyDownListener);
      document.removeEventListener("keyup", this.keyUpListener);
    }
  };

  // quiz/client/src/screens/join.ts
  var JoinScreen = class extends DOMScreen {
    init() {
      this.domRef.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        const container = target.closest(".join-container");
        if (!container) {
          return;
        }
        const action = container.getAttribute("data-action");
        switch (action) {
          case "join":
            this.showJoinDialog();
            break;
          case "create":
            socket.sendMsg("game.create" /* GAME_CREATE */);
            break;
        }
      });
      this.errListener = socket.on("generic.error" /* ERROR */, ({ title }) => {
        console.log("called err");
        showDialog(title);
        this.submitDisabled(false);
      });
      const lobby = DOMScreen.spawnScreen(new LobbyScreen());
      this.joinedListener = socket.once(
        "game.status" /* GAME_STATUS */,
        ({ id, status }) => {
          socket.off("generic.error" /* ERROR */, this.errListener);
          lobby.setActive();
        }
      );
    }
    setActive(direction, asOverlay) {
      super.setActive(direction, asOverlay);
      const hashPath = location.hash.split("/");
      if (hashPath.length > 1) {
        const lobbyId = hashPath[1];
        socket.sendMsg("game.join" /* GAME_JOIN */, { id: lobbyId });
      }
    }
    showJoinDialog() {
      const joinDom = document.createElement("div");
      joinDom.innerHTML = `<input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">`;
      showDialog("Join Game", "", {
        alternativeContentDom: joinDom,
        actions: [
          {
            value: "cancel",
            title: "Cancel",
            class: "button-outline"
          },
          {
            value: "join",
            title: "Join",
            class: "button-primary"
          }
        ],
        callback: (v) => {
          switch (v) {
            case "join":
              const { value: joinId } = joinDom.querySelector(
                '[name="lobby-id"]'
              );
              socket.sendMsg("game.join" /* GAME_JOIN */, { id: joinId });
              break;
          }
        }
      });
    }
    submitDisabled(d) {
      this.domRef.querySelectorAll("input[type=submit]").forEach((i) => i.disabled = d);
    }
    die() {
      super.die();
      socket.off("generic.error" /* ERROR */, this.errListener);
      socket.off("game.status" /* GAME_STATUS */, this.joinedListener);
    }
    template() {
      return `
    <h1 class="title-h1">PLAY</h1>
    <section class="multiple-container-wrapper">
      <div class="container container-image join-container" data-action="join">
        <img src="/imgs/join.jpg" alt="join">
        <div class="container-image-content">
          <div class="title-h2">Join Game</div>
          <p class="join-container-description">Join an existing game and have fun with your friends</p>
        </div>
      </div>

      <div class="container container-image join-container" data-action="create">
        <img src="/imgs/create.jpg" alt="create">
        <div class="container-image-content">
          <div class="title-h2">Create Game</div>
          <p class="join-container-description">Create a new game with your own custom settings</p>
        </div>
        <!-- <form name="create">
          <input type="submit" class="button button-primary" name="create-new" value="Create New">
        </form> -->
      </div>
    </section>`;
    }
  };

  // quiz/client/src/screens/login.ts
  var LoginScreen = class extends DOMScreen {
    constructor() {
      super(...arguments);
      this.additionalClasses = ["gradient-bg-screen"];
    }
    init() {
      this.inputDom = this.domRef.querySelector("input[name=username]");
      this.domRef.querySelector("form").addEventListener("submit", (e) => __async(this, null, function* () {
        e.preventDefault();
        const submitButton = e.target["submit"];
        submitButton.disabled = true;
        const name = e.target["username"].value;
        if (!socket.isOpen()) {
          yield socket.open();
        }
        socket.sendMsg("me.change_name" /* ME_CHANGE_NAME */, { name });
        DOMScreen.spawnScreen(new JoinScreen()).setActive();
        try {
          localStorage.setItem("username", name);
        } catch (_) {
        }
      }));
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        this.inputDom.value = storedUsername;
      }
    }
    setActive() {
      super.setActive("none");
      this.inputDom.focus({ preventScroll: true });
      this.inputDom.select();
    }
    template() {
      return `
    <div class="title-bar">
      <div class="title-bar-spacer"></div>
    </div>
    <div class="content-wrapper">
      <div class="vertical-container-wrapper">
        <div class="login-logo">
        <img src="/imgs/logo.png" alt="logo">
        </div>
        <form class="stacked-form" name="login">
          <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
          <input type="submit" class="button button-primary" name="submit" value="Start">
        </form>
      </div>
    </div>
    <div class="bottom-container align-right" data-tab="overview">
      <!-- <a href="" class="button button-outline button-small">Discord</a> -->
    </div>`;
    }
    die() {
      super.die();
      socket.off("generic.error" /* ERROR */, this.errListener);
    }
  };

  // quiz/client/src/client.ts
  window.onbeforeunload = function(e) {
    e.preventDefault();
    return "are you sure?";
  };
  socket.on("me" /* ME */, (me) => {
    globalState.me.id = me.id;
    globalState.me.name = me.name;
  });
  var login = DOMScreen.spawnScreen(new LoginScreen());
  login.setActive();
})();
/*! Bundled license information:

escape-html/index.js:
  (*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
