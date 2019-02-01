# SOS Brumadinho Localizador

## Descrição
Este aplicativo envia periodicamente a localização para a API, que salva os locais visitados.

## Executando o app

É preciso ter o [Node.js](https://nodejs.org/en/) instalado na máquina para executar no navegador. Além disso, é preciso ter o [Android SDK](https://developer.android.com/studio/) para executar no Android.

### Configurando
Clone o repositório para um diretório da sua preferência

Instale o Ionic e o Cordova:

    npm install -g ionic cordova

### Executando no navegador

Dentro da pasta raiz do repositório, execute:

    ionic serve

Uma página abrirá no navegador com o app. É possível usar o inspetor do Chrome (`F12` e depois `Ctrl` + `Shift` + `M`) para ver como ficaria num smartphone.

### Executando em um dispositivo Android

Dentro da pasta raiz do repositório, execute:

    ionic cordova prepare android
    ionic cordova run android

## HELP NEEDED

O aplicativo ainda está muito cru, e não está 100% funcional. Toda ajuda é bem-vinda!