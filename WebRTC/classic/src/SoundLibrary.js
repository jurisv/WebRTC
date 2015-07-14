Ext.define('WebRTC.SoundLibrary', {
    xtype: 'soundlibrary',

    sounds: [
        {id: 'whistle', mp3: 'resources/audio/whistle.mp3', wav: null, ogg:'resources/audio/whistle.ogg'}
    ],

    init: function() {

        /*var items = [];

         Ext.each(Ext.Array.from(rssItems),
         function (rssItem) {
         var title = rssItem.get('title'),
         link = rssItem.get('link'),
         item = this.child('feedpost[link="' + link + '"]');

         if (!item) {
         items.push({
         xtype: 'feedpost',
         title: title,
         link: link,
         closable: true,
         rssItem: rssItem,
         viewModel: {
         data: {
         inTab: true
         }
         }
         });
         } else {
         duplicate = duplicate || item;
         }
         },
         parent
         );

         Ext.suspendLayouts();

         if (items.length) {
         items = parent.insert(1, items);
         }
         parent.setActiveTab(items[0] || duplicate);

         Ext.resumeLayouts(true);

         <audio preload="auto" id="whistle">
         <source src="resources/audio/whistle.mp3"></source>
         <source src="resources/audio/whistle.ogg"></source>
         </audio>
         */
    }
});