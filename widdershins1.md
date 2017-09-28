---
title: Swagger Petstore v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - javascript--nodejs: Node.JS
  - python: Python
  - ruby: Ruby
  - java: Java
toc_footers: []
includes: []
search: true
highlight_theme: darkula
---

# Swagger Petstore v1.0.0

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.


Base URLs:

* <a href="http://petstore.swagger.io/v1">http://petstore.swagger.io/v1</a>


License: MIT

# pets

## listPets

> Code samples

```shell
# You can also use wget
curl -X get http://petstore.swagger.io/v1/pets \
  -H 'Accept: application/json'

```

```http
GET http://petstore.swagger.io/v1/pets HTTP/1.1
Host: petstore.swagger.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://petstore.swagger.io/v1/pets',
  method: 'get',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('http://petstore.swagger.io/v1/pets',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://petstore.swagger.io/v1/pets', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://petstore.swagger.io/v1/pets', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("http://petstore.swagger.io/v1/pets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET /pets`

*List all pets*

### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
limit|query|integer(int32)|false|How many items to return at one time (max 100)


### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|An paged array of pets
default|Default|unexpected error

### Response Headers

Status|Header|Type|Format|Description
---|---|---|---|---|
200|x-next|string||A link to the next page of responses

> Example responses

```json
[
  {}
]
```
```json
{}
```
<aside class="success">
This operation does not require authentication
</aside>

## createPets

> Code samples

```shell
# You can also use wget
curl -X post http://petstore.swagger.io/v1/pets \
  -H 'Accept: application/json'

```

```http
POST http://petstore.swagger.io/v1/pets HTTP/1.1
Host: petstore.swagger.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://petstore.swagger.io/v1/pets',
  method: 'post',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('http://petstore.swagger.io/v1/pets',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post 'http://petstore.swagger.io/v1/pets', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('http://petstore.swagger.io/v1/pets', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("http://petstore.swagger.io/v1/pets");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`POST /pets`

*Create a pet*

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Null response
default|Default|unexpected error

> Example responses

```json
{}
```
<aside class="success">
This operation does not require authentication
</aside>

## showPetById

> Code samples

```shell
# You can also use wget
curl -X get http://petstore.swagger.io/v1/pets/{petId} \
  -H 'Accept: application/json'

```

```http
GET http://petstore.swagger.io/v1/pets/{petId} HTTP/1.1
Host: petstore.swagger.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://petstore.swagger.io/v1/pets/{petId}',
  method: 'get',

  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('http://petstore.swagger.io/v1/pets/{petId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'http://petstore.swagger.io/v1/pets/{petId}', params: {
  }, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('http://petstore.swagger.io/v1/pets/{petId}', params={

}, headers = headers)

print r.json()
```

```java
URL obj = new URL("http://petstore.swagger.io/v1/pets/{petId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

`GET /pets/{petId}`

*Info for a specific pet*

### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
petId|path|string|true|The id of the pet to retrieve


### Responses

Status|Meaning|Description
---|---|---|
200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Expected response to a valid request
default|Default|unexpected error

> Example responses

```json
[
  {}
]
```
```json
{}
```
<aside class="success">
This operation does not require authentication
</aside>

# Default

## POST /streams

> Code samples

```shell
# You can also use wget
curl -X post http://petstore.swagger.io/v1/streams?callbackUrl=https%3A%2F%2Ftonys-server.com \
  -H 'Accept: application/json'

```

```http
POST http://petstore.swagger.io/v1/streams?callbackUrl=https%3A%2F%2Ftonys-server.com HTTP/1.1
Host: petstore.swagger.io

Accept: application/json

```

```javascript
var headers = {
  'Accept':'application/json'

};

$.ajax({
  url: 'http://petstore.swagger.io/v1/streams',
  method: 'post',
  data: '?callbackUrl=https%3A%2F%2Ftonys-server.com',
  headers: headers,
  success: function(data) {
    console.log(JSON.stringify(data));
  }
})
```

```javascript--nodejs
const request = require('node-fetch');

const headers = {
  'Accept':'application/json'

};

fetch('http://petstore.swagger.io/v1/streams?callbackUrl=https%3A%2F%2Ftonys-server.com',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});
```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.post 'http://petstore.swagger.io/v1/streams', params: {
  'callbackUrl' => 'string(uri)'
}, headers: headers

p JSON.parse(result)
```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('http://petstore.swagger.io/v1/streams', params={
  'callbackUrl': 'https://tonys-server.com'
}, headers = headers)

print r.json()
```

```java
URL obj = new URL("http://petstore.swagger.io/v1/streams?callbackUrl=https%3A%2F%2Ftonys-server.com");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());
```

*subscribes a client to receive out-of-band data*

### Parameters

Parameter|In|Type|Required|Description
---|---|---|---|---|
callbackUrl|query|string(uri)|true|the location where data will be sent.  Must be network accessible


##### callbackUrl
the location where data will be sent.  Must be network accessible
by the source server

### Responses

Status|Meaning|Description
---|---|---|
201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|subscription successfully created

> Example responses

```json
{}
```
<aside class="success">
This operation does not require authentication
</aside>



