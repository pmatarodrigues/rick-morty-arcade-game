var preload = function(game){}

preload.prototype = {
    
    preload : function(){
        
        // --- carregar loading
        var barra = this.add.sprite(160, 240, "loading");
        //---- animar imagem de loading enquanto carrega o resto dos assets
        barra.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(barra);
        
        // ---- players
        this.game.load.spritesheet("rick", "assets/rick.png", 32, 48);
        
        // ---- inimigos
        this.game.load.spritesheet("morty_buffed", "assets/morty_buffed2.png", 42, 56);
        this.game.load.spritesheet("parasitic_morty", "assets/parasitic_morty.png", 42.25, 47);
        this.game.load.spritesheet("anomaly_morty", "assets/anomaly_morty.png", 42.25, 47);
        this.game.load.spritesheet("final_morty", "assets/final_morty.png", 131.25, 164.5);

        // -- objetos
        this.game.load.image('bala', 'assets/objetos/bala.png');
        this.game.load.image('bala_inimigo', 'assets/objetos/bala_inimigo.png');
        this.game.load.image('vidas', 'assets/objetos/vidas.png');

        this.game.load.image('screaming_sun', 'assets/objetos/screaming_sun.png');
        this.game.load.image('nivelintro_background', 'assets/objetos/nivelintro_background.png');

        
        // ---- carrega os assets
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("pausa", "assets/pausa.png");
        this.game.load.image("home_logo", "assets/rickandmorty_home.png");
        
        this.game.load.image("vitoria", "assets/vitoria.png");
        this.game.load.image("gameover", "assets/gameover.png");


        // --- mapa
        this.game.load.tilemap('map', 'assets/mapa/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('map_nivel2', 'assets/mapa/map_nivel2_t.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('map_nivel3', 'assets/mapa/map_nivel3_t.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/mapa/tiles.png');
        this.game.load.image('tiles2', 'assets/mapa/tiles2.png');
        this.game.load.image('portal', 'assets/objetos/portal.png');
        this.game.load.image('setas', 'assets/mapa/seta.png');


        // --- audio
        this.game.load.audio('tiro', 'assets/audio/tiro.mp3');
        this.game.load.audio('laser', 'assets/audio/laser.mp3');

        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


    },
    
    create : function(){
        this.game.state.start("menu");
    }
    
}