// soapRequest.js

var description = ''

function soapRequest() {
  var description = document.getElementById('description').value
  var tipo = document.getElementById('tipoincidente').value
  var nombrepaciente = document.getElementById('nombrepaciente').value
  var fechaincidente = document.getElementById('fechaincidente').value

  var str =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:qms="http://qms.ws.sas.interact.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<qms:registerOccurrenceNS>' +
    '<contract>bb1e1007-03a6-4ccb-8552-bd1e197850eb</contract>' +
    '<service>ws.qms</service>' +
    '<application>Occurrence Manager WS</application>' +
    '<secret>NhDnFiDlCfFlPbLbOeEcNmKlBeBdOiPlLpIoDbEbLkMnCeEoBhBeLlFcLdIfNdHn</secret>' +
    '<type>' +
    tipo +
    '</type>' +
    '<names>@author</names>' +
    '<values>davagre</values>' +
    '<names>@title</names>' +
    '<values>Incidente</values>' +
    '<names>@description</names>' +
    '<values>' +
    description +
    '</values>' +
    '<names>nombre</names>' +
    '<values>' +
    nombrepaciente +
    '</values>' +
    '<names>fechadelincidente</names>' +
    '<values>' +
    fechaincidente +
    '</values>' +
    '</qms:registerOccurrenceNS>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'

  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
      xhr.open(method, url, false)
    } else if (typeof XDomainRequest != 'undefined') {
      xhr = new XDomainRequest()
      xhr.open(method, url)
    } else {
      console.log('CORS not supported')
      alert('CORS not supported')
      xhr = null
    }
    return xhr
  }

  var xhr = createCORSRequest(
    'POST',
    'https://latam.interact.com.br/sa/ws/qms?wsdl'
  )
  if (!xhr) {
    console.log('XHR issue')
    return
  }

  xhr.onload = function () {
    var results = xhr.responseText
    var cadena = results.slice(283, 289)
    alert('Registrado, tu número de incidencia es ' + cadena)
  }

  xhr.setRequestHeader('Content-Type', 'text/xml')
  xhr.send(str)
}
