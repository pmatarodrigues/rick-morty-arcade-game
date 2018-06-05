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
        this.game.load.image('bala', 'assets/bala.png');
        this.game.load.image('bala_inimigo', 'assets/bala_inimigo.png');
        this.game.load.image('vidas', 'assets/vidas.png');

        
        // ---- carrega os assets
        this.game.load.image("play", "assets/play.png");
        this.game.load.image("home_logo", "assets/rickandmorty_home.png");

        // --- mapa
        this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('map_nivel2', 'assets/map_nivel2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('map_nivel3', 'assets/map_nivel3.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles.png');
        this.game.load.image('tiles2', 'assets/tiles2.png');
        this.game.load.image('portal', 'assets/portal.png');

    },
    
    create : function(){
        this.game.state.start("menu");
    }
    
}