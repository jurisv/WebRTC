Ext.define('WebRTC.SoundLibrary', {
    extend: 'Ext.Component',
    xtype: 'soundlibrary',

    data: [
        {id: 'whistle', mp3: 'resources/audio/whistle.mp3', wav: null, ogg:'resources/audio/whistle.ogg'}
    ],

    renderTo: Ext.getBody(),

    tpl: '<tpl for=".">' +
             '<audio preload="auto" id="x-soundlibrary-{id}">' +
             '<source src="{mp3}"></source>' +
             '<source src="{wav}"></source>' +
             '<source src="{ogg}"></source>' +
             '</audio>' +
         '</tpl>',

    getMedia: function () {
        return this.el.down('audio');
    }

});