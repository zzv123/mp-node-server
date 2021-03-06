define({ "api": [
  {
    "type": "post",
    "url": "/user/authorize",
    "title": "微信验证授权",
    "name": "微信验证授权",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wxCode",
            "description": "<p>小程序授权Code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"获取授权成功\",\n  \"data\": \"data\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4321/user/authorize"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "用户注册",
    "name": "用户注册",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"注册成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4321/user/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "用户名密码登录",
    "name": "用户登录",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"登录成功\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4321/user/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/decrypt",
    "title": "解密微信用户手机号",
    "name": "解密微信用户手机号",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userToken",
            "description": "<p>用户令牌</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "encryptedData",
            "description": "<p>加密数据</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iv",
            "description": "<p>iv</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"msg\": \"解密微信用户信息成功\",\n  \"data\": \"data\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/userRouter.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:4321/user/decrypt"
      }
    ]
  }
] });
