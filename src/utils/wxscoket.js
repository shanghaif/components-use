var TOPIC_EMPTY = 'topic为空！'
var MSG_EMPTY = '消息内容为空！'
var DISCONNECT_MSG = '当前尚未连接'

// eslint-disable-next-line no-unused-vars
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      var str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function  timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000)
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 <= 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() + 1 <= 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() + 1 <= 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  var m = (date.getMinutes() + 1 <= 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  var s = (date.getSeconds() + 1 <= 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  return Y + M + D + h + m + s;
}
const didata = [];
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
var sendInfo = {
  topic: '/test',
  text: 'Hello world!',
  qos: 0,
  retained: true
}

// eslint-disable-next-line no-unused-vars
var Websocket = {
  modName: 'websocket',
  client: null,
  connState: false,
  cInfo: {
    host: location.hostname,
    port: 8083,
    clientId: 'C_' + new Date().getTime(),
    userName: 'test',
    password: 'test123',
    keepAlive: null,
    cleanSession: true
  },
  sendInfo: '{}',
  tablelist: [],
  originrecivedata: [],
  send: function () {
    var _this = this
    var sendInfo = JSON.parse(_this.sendInfo)
    _this.sendMessage(sendInfo)
  },
  log: function (Msg) {
    try {
      Msg = JSON.parse(Msg)
      // eslint-disable-next-line no-empty
    } catch (e) {
    }
    // eslint-disable-next-line no-undef
    _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: 'onConnectionLost: ' + JSON.stringify(Msg) })
    console.log(111)
  },
  newClient: function () {
    var _this = this
    // eslint-disable-next-line no-undef
    _this.client = new Paho.MQTT.Client(_this.cInfo.host, Number(_this.cInfo.port), _this.cInfo.clientId)
    // _this.connect()
  },
  sslPort: function () {
    var _this = this
    var useSSL = _this.cInfo.useSSL
    if (useSSL) {
      _this.cInfo.port = 8084
    } else {
      _this.cInfo.port = 8083
    }
  },
  recive: function (msg) {
    // console.log(msg)
    var _this = this
    var origindata = JSON.parse(msg)
    _this.originrecivedata.length=0
      origindata.data.map(items => {
        didata.map(child => {
          if (items.di == child.key) {
            _this.originrecivedata.unshift({
              "di": items.di,
              "pn": items.pn,
              "value": items.value,
              "vcaddr": origindata.vcaddr,
              "ts": timestampToTime(items.ts),
              "meteraddr": items.meteraddr,
              "diname": child.label,
              "time":items.time,
              "status":items.status
            })
          }
        })
      })
    console.log(_this.originrecivedata)
  },
  connect: function () {
    var _this = this
    // eslint-disable-next-line no-undef
    _this.newClient()
    if (!_this.client) {
      return
    }

    _this.client.onConnectionLost = function (responseObject) {
      if (responseObject.errorCode !== 0) {
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: 'onConnectionLost: ' + JSON.stringify(responseObject.errorMessage) })
        console.log('onConnectionLost: ' + responseObject.errorMessage)
      }
      _this.disconnect()
    }
    _this.client.onMessageArrived = function (message) {
      try {
        message.msgString = message.payloadString
      } catch (e) {
        message.msgString = 'Binary message(' + message.payloadBytes.length + ')'
      }
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: JSON.stringify(message.payloadString) })
      _this.recive(message.payloadString)
    }

    var options = {
      onFailure: function (err) {
        _this.connState = false
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: '连接失败' })
        console.log('连接失败 ' + err.errorMessage)
      },
      onSuccess: function () {
        _this.connState = true
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: '连接成功' })
        console.log('连接成功！')
      },
    }
    var userName = _this.cInfo.userName
    var password = _this.cInfo.password
    var keepAlive = _this.cInfo.keepAlive
    var cleanSession = _this.cInfo.cleanSession
    // var useSSL = _this.cInfo.useSSL
    if (userName) {
      options.userName = userName
    }
    if (password) {
      options.password = password
    }
    if (keepAlive) {
      options.keepAliveInterval = Number(keepAlive)
    }
    options.cleanSession = cleanSession
    // options.useSSL = useSSL
    _this.client.connect(options)
  },

  disconnect: function () {
    var _this = this
    if (_this.client && this.client.isConnected()) {
      _this.client.disconnect()
      _this.client = null
    }
    _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: '已断开连接' })
    console.log('已经断开连接！')
    _this.connState = false
  },
  subscribe: function (subInfo, callback) {
    var _this = this
    if (!_this.client || !_this.client.isConnected()) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: DISCONNECT_MSG })
      console.log(DISCONNECT_MSG)
     alert(DISCONNECT_MSG,'请刷新页面')
      return
    }
    if (!subInfo.topic) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: TOPIC_EMPTY })
      console.log(TOPIC_EMPTY)
      return
    }
    _this.client.subscribe(subInfo.topic, {
      qos: Number(subInfo.qos),
      onSuccess: function (msg) {
        subInfo.msg = msg
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: JSON.stringify(subInfo) })
        console.log(subInfo.msg)
        subInfo.result = true
        callback && callback(subInfo)
      },
      onFailure: function (err) {
        if (err.errorCode[0] === 128) {
          console.log('The topic cannot SUBSCRIBE for ACL Deny')
        }
        subInfo.msg = err
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: JSON.stringify(err) })
        console.log(err)
        subInfo.result = false
        callback && callback(subInfo)
      }
    })
  },
  unsubscribe: function (subInfo, callback) {
    var _this = this
    if (!_this.client || !_this.client.isConnected()) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: DISCONNECT_MSG })
      console.log(DISCONNECT_MSG)
      return
    }
    if (!subInfo.topic) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: TOPIC_EMPTY })
      console.log(TOPIC_EMPTY)
      return
    }
    _this.client.unsubscribe(subInfo.topic, {
      onSuccess: function (msg) {
        subInfo.msg = msg
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: JSON.stringify(subInfo) })
        console.log(subInfo)
        subInfo.result = true
        callback && callback(subInfo)
      },
      onFailure: function (err) {
        subInfo.msg = err
        _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: JSON.stringify(err) })
        console.log(err)
        subInfo.result = true
        callback && callback(subInfo)
      }
    })
  },
  sendMessage: function (sendInfo) {
    var _this = this
    var text = sendInfo.text
    if (!_this.client || !_this.client.isConnected()) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: DISCONNECT_MSG })
      console.log(DISCONNECT_MSG)
      
      return
    }
    if (!sendInfo.topic) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: TOPIC_EMPTY })
      console.log(TOPIC_EMPTY)
      
      return
    }
    if (!text) {
      _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: MSG_EMPTY })
      console.log(MSG_EMPTY)
     
      return
    }
    // eslint-disable-next-line no-undef
    var message = new Paho.MQTT.Message(text)
    message.destinationName = sendInfo.topic
    message.qos = Number(sendInfo.qos)
    message.retained = sendInfo.retained
    _this.client.send(message)
    _this.tablelist.push({ date: formatDate(new Date(), 'yyyy-MM-dd hh:mm'), content: JSON.stringify(sendInfo) })
    console.log(sendInfo)
  }
}
export {
  // eslint-disable-next-line no-undef
  Websocket,
  sendInfo,
  TOPIC_EMPTY,
  MSG_EMPTY,
  DISCONNECT_MSG,
  didata
}
