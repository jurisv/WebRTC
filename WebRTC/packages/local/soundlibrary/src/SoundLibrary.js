Ext.define('soundlibrary.base.SoundLibrary', {
    extend: 'Ext.Component',
    xtype: 'soundlibrary',

    renderTo: Ext.getBody(),

    tpl: [
        '<tpl for=".">',
        '<audio preload="auto">' ,
        '<source src="{mp3}"></source>' ,
        '<source src="{wav}"></source>' ,
        '<source src="{ogg}"></source>' ,
        '</audio>' ,
        '</tpl>'
    ],

    getMedia: function () {
        return this.el.down('audio');
    }

});