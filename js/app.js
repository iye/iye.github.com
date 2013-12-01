var AppRouter = Backbone.Router.extend({
	routes: {
		"": "list",
		"proyect/:item": "showItem"
	},

	initialize: function  () {
  
    var proyectsArray = [
        {
          name: 'lightsOn.sh',
          description: 'a Bash script that prevents Xscreensaver and Power Management to be activated when you are watching flash videos fullscreen with Firefox and Chromium.',
          url:'https://github.com/iye/lightsOn'
        },
        {
          name: 'Devilish',
          description: 'PyGTK App for monitoring log files realtime. It uses inotify (via Pyinotify ) to detect file modifications and when an appended line has a string you are interested in, it will alert you via your notification daemon and with an icon in the tray.',
          url:'https://github.com/iye/Devilish'
        },
        {
          name: 'CheckSkypeRunning',
          description: 'Skype (till version 2.2.0.25 at least) has a bug where if you activate autologin and you accidentally run skype twice, the autologin option is disabeled :/ . This Bash Script will launch skype only if it s not already running and show you a dialog otherwise.',
          url:'https://github.com/iye/checkskyperunning.sh'
        },
        {
          name: 'Radio del Este',
          description: 'pics of a bus radio studio on which I made all the telecomunication systems.',
          url:'radio/radio.html'
        },
        {
          name: 'AppArmor Tutorial',
          description: 'how to install AppArmor in Debian Stable.',
          url:'http://crunchbanglinux.org/forums/topic/14412/tutorial-how-to-install-apparmor-in-debian-stable/'
        },
        {
          name: 'Zoneminder 1.24.3 LFI',
          description: 'a Local File Inclusion vulnerability I found in Zoneminder.',
          url:'zm_lfi.txt'
        },
        {
          name: 'Buscador del buzón del ciudadano de la prov. de Córdoba',
          description: 'a search engine for inquiries made to the Córdoba state goverment via its webpage, not finished yet.',
          url:'http://tessst.dreamhosters.com/'
        },
        { name: 'MeetCordoba.com.ar',
          description: 'a page suggesting places to visit in the State of Córdoba, Argentina.',
          url:'http://www.meetcordoba.com.ar/'
        }
        ];
    
    proyectItemsViewArray = [];
    itemsInArray = proyectsArray.length;
    for (i=0; i<itemsInArray; i++) {
      proyectItemsViewArray.push(new ProyectItem(proyectsArray[i]));
    }
    this.proyectItems = new ProyectItems(proyectItemsViewArray);
    this.proyectView = new ProyectItemView({collection: this.proyectItems}); 
    

	},

	list: function () {
    $('#proyectList').html(this.proyectView.render().el);
	},

	showItem: function (item) {
		this.proyectView.model = this.proyectItems.get(item);
		$('#proyectList').html(this.proyectView.render().el);
	},

	itemForm: function () {
		$('#app').html('New item form');
	}
});

var app = new AppRouter();

$(function() {
	Backbone.history.start();
});