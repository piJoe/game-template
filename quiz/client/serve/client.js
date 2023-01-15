(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
    var _a;
    const d = openDialogs.get(id);
    if (d) {
      overlay.removeChild(d.dom);
    }
    openDialogs.delete(id);
    if ((_a = d.options) == null ? void 0 : _a.callback) {
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
        case "generic.error" /* ERROR */:
          this.callListeners(
            "generic.error" /* ERROR */,
            data
          );
          break;
      }
    }
  };
  var socket = new Socket();

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
  var DOMScreen = class {
    constructor() {
      this.killWhenInactive = true;
    }
    setup() {
      this.domRef = document.createElement("div");
      this.domRef.classList.add("screen");
      this.domRef.setAttribute("data-screen-active", "next");
    }
    render() {
      this.domRef.innerHTML = this.template();
      document.body.querySelector(".screen-container").appendChild(this.domRef);
    }
    template() {
      return ``;
    }
    setActive(direction = "right") {
      if (activeScreen) {
        activeScreen.setInactive(direction);
      }
      this.domRef.setAttribute(
        "data-screen-active",
        direction == "right" ? "cur" : "cur-left"
      );
      activeScreen = this;
    }
    setInactive(direction = "right") {
      this.domRef.setAttribute(
        "data-screen-active",
        direction == "right" ? "prev" : "prev-left"
      );
      if (this.killWhenInactive) {
        this.die();
      }
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
  };

  // quiz/client/src/screens/question.ts
  var QuestionScreen = class extends DOMScreen {
    constructor(lobby, questionId, question) {
      super();
      this.questionId = null;
      this.ownAnwser = null;
      this.questionDone = false;
      this.lobby = lobby;
      this.questionId = questionId;
      this.question = question;
    }
    init() {
      this.domRef.addEventListener("click", (e) => {
        const elem = e.target;
        if (!elem.hasAttribute("data-answer")) {
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
      this.timerDOM = this.domRef.querySelector(".question-timer");
    }
    setActive() {
      super.setActive();
      this.timerStarted = Date.now();
      window.requestAnimationFrame(() => {
        this.updateTimer();
      });
    }
    updateTimer() {
      const timeLeftSeconds = Math.ceil(
        (this.timerStarted + this.question.timeoutMs - Date.now()) / 1e3
      );
      let timePercentage = Math.max(
        1 - (Date.now() - this.timerStarted) / this.question.timeoutMs,
        0
      );
      if (this.questionDone) {
        timePercentage = 0;
      }
      this.timerDOM.style.transform = `scaleX(${timePercentage})`;
      if (timeLeftSeconds > 0 || !this.questionDone) {
        window.requestAnimationFrame(() => {
          this.updateTimer();
        });
      }
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
    template() {
      const question = this.question.question;
      const answers = this.question.answers;
      const hasImage = this.question.question.image ? true : false;
      return `
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId + 1}</div>
        ${hasImage ? `<img class="question-image" src="${(0, import_escape_html.default)(question.image)}">` : ""}
        <div class="question-title title-h3">${(0, import_escape_html.default)(question.title)}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${answers.map(
        (a, idx) => `<li data-answer="${idx}">
            ${(0, import_escape_html.default)(a)}
            <div class="answer-others-container"></div>
          </li>`
      ).join("")}
      </ul>
    </div>`;
    }
  };

  // quiz/client/src/screens/lobby.ts
  var LobbyScreen = class extends DOMScreen {
    constructor() {
      super();
      this.killWhenInactive = false;
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
      const toggleSettingsButton = this.domRef.querySelector(
        "#toggle-lobby-settings"
      );
      const backToJoinButton = this.domRef.querySelector(
        "#lobby-back-button"
      );
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
      const playerListDom = this.domRef.querySelector(".playerlist");
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
        ({ playerlist }) => {
          this.playerlist = playerlist;
          playerListDom.innerHTML = [...this.playerlist].map(
            (e) => `<li class="playerlist-entry">
                ${e.name} <!-- (${e.score}) -->
                ${e.ready ? `<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>` : `<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>`}
              </li>`
          ).join("");
          this.scoreboardDom.innerHTML = [...this.playerlist].sort((a, b) => b.score - a.score).map(
            (e) => `<li class="playerlist-entry">
                ${e.name}
                <div class="skewed-tag ${e.playerId === globalState.me.id ? "skewed-tag-primary" : ""} tag-score">${e.score}</div>
              </li>`
          ).join("");
          const self2 = playerlist.find((e) => e.playerId === globalState.me.id);
          this.selfReady = self2 == null ? void 0 : self2.ready;
          this.updateReadyButton();
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
          console.log("CALLED SELF LEFT LISTENER");
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
        navigator.clipboard.writeText(this.lobbyId);
      });
      toggleSettingsButton.addEventListener("click", (e) => {
        e.preventDefault();
        showDialog("WIP", void 0, {
          actions: [
            {
              title: "Cancel",
              value: "cancel",
              class: "button-outline"
            },
            {
              title: "Ok!",
              value: "ok",
              class: "button-primary"
            }
          ]
        });
      });
      backToJoinButton.addEventListener("click", (e) => {
        e.preventDefault();
        socket.sendMsg("game.leave" /* GAME_LEAVE */);
      });
    }
    updateReadyButton() {
      this.readyButton.value = this.currentLobbyStatus === "IN_GAME" /* IN_GAME */ ? "GAME STARTING" : this.selfReady ? "NOT Ready" : "READY";
      this.readyButton.setAttribute("data-active", this.selfReady + "");
      this.readyButton.disabled = this.currentLobbyStatus === "IN_GAME" /* IN_GAME */;
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
    template() {
      return `
    <h1 class="title-h1">LOBBY</h1>
    <section class="lobby-wrapper">
      <div class="multiple-container-wrapper">
        <div class="container" style="display:none;">
          <div class="title-h2">TODO: SETTINGS</div>
        </div>

        <div class="container lobby-container">
          <div class="title-h3 lobby-title">
            Lobby Code: <br>
            <span class="title-h2">
            <span id="lobby-id">${this.lobbyId}</span>&nbsp;
              <a id="copy-lobby-id" title="Copy Lobby ID" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>
          <ul class="playerlist"></ul>
        </div>
      </div>
      <div class="lobby-action">
        <a id="toggle-lobby-settings" class="button button-outline button-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0001 15.5C11.0718 15.5 10.1816 15.1313 9.52521 14.4749C8.86883 13.8185 8.50008 12.9283 8.50008 12C8.50008 11.0717 8.86883 10.1815 9.52521 9.52513C10.1816 8.86875 11.0718 8.5 12.0001 8.5C12.9283 8.5 13.8186 8.86875 14.475 9.52513C15.1313 10.1815 15.5001 11.0717 15.5001 12C15.5001 12.9283 15.1313 13.8185 14.475 14.4749C13.8186 15.1313 12.9283 15.5 12.0001 15.5ZM19.4301 12.97C19.4701 12.65 19.5001 12.33 19.5001 12C19.5001 11.67 19.4701 11.34 19.4301 11L21.5401 9.37C21.7301 9.22 21.7801 8.95 21.6601 8.73L19.6601 5.27C19.5401 5.05 19.2701 4.96 19.0501 5.05L16.5601 6.05C16.0401 5.66 15.5001 5.32 14.8701 5.07L14.5001 2.42C14.4601 2.18 14.2501 2 14.0001 2H10.0001C9.75008 2 9.54008 2.18 9.50008 2.42L9.13008 5.07C8.50008 5.32 7.96008 5.66 7.44008 6.05L4.95008 5.05C4.73008 4.96 4.46008 5.05 4.34008 5.27L2.34008 8.73C2.21008 8.95 2.27008 9.22 2.46008 9.37L4.57008 11C4.53008 11.34 4.50008 11.67 4.50008 12C4.50008 12.33 4.53008 12.65 4.57008 12.97L2.46008 14.63C2.27008 14.78 2.21008 15.05 2.34008 15.27L4.34008 18.73C4.46008 18.95 4.73008 19.03 4.95008 18.95L7.44008 17.94C7.96008 18.34 8.50008 18.68 9.13008 18.93L9.50008 21.58C9.54008 21.82 9.75008 22 10.0001 22H14.0001C14.2501 22 14.4601 21.82 14.5001 21.58L14.8701 18.93C15.5001 18.67 16.0401 18.34 16.5601 17.94L19.0501 18.95C19.2701 19.03 19.5401 18.95 19.6601 18.73L21.6601 15.27C21.7801 15.05 21.7301 14.78 21.5401 14.63L19.4301 12.97Z" fill="currentColor"/>
          </svg>
        </a>
        <input type="button" class="button button-primary" id="lobby-ready" value="Ready!" disabled=true>
      </div>
    </section>
    <div class="bottom-container">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Back">
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
    die() {
      super.die();
      socket.off("game.status" /* GAME_STATUS */, this.statusListener);
      socket.off("game.playerlist" /* GAME_PLAYERLIST */, this.playerlistListener);
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
      document.removeEventListener("keydown", this.keydown);
      document.removeEventListener("keyup", this.keyup);
    }
  };

  // quiz/client/src/screens/join.ts
  var JoinScreen = class extends DOMScreen {
    init() {
      this.domRef.querySelector("form[name=create]").addEventListener("submit", (e) => __async(this, null, function* () {
        e.preventDefault();
        this.submitDisabled(true);
        socket.sendMsg("game.create" /* GAME_CREATE */);
      }));
      this.domRef.querySelector("form[name=join]").addEventListener("submit", (e) => __async(this, null, function* () {
        e.preventDefault();
        document.activeElement.blur();
        const joinId = e.target["lobby-id"].value;
        this.submitDisabled(true);
        socket.sendMsg("game.join" /* GAME_JOIN */, { id: joinId });
      }));
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
      <div class="container">
        <div class="title-h2">Create Lobby</div>
        <form name="create">
          <input type="submit" class="button button-primary" name="create-new" value="Create New">
        </form>
      </div>

      <label class="container">
        <div class="title-h2">Join Lobby</div>
        <form class="combined-form" name="join">
          <input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">
          <input type="submit" class="button button-primary" name="join" value="Join">
        </form>
      </label>
    </section>`;
    }
  };

  // quiz/client/src/screens/login.ts
  var LoginScreen = class extends DOMScreen {
    init() {
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
      }));
    }
    setActive() {
      super.setActive();
      this.domRef.querySelector("input[name=username]").focus({ preventScroll: true });
    }
    template() {
      return `
    <h1 class="title-h1">Login</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`;
    }
    die() {
      super.die();
      socket.off("generic.error" /* ERROR */, this.errListener);
    }
  };

  // quiz/client/src/client.ts
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
