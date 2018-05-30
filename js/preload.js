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
        this.game.load.spritesheet("morty_buffed", "assets/morty_buffed2.png", 42, 56);
        // -- objetos
        this.game.load.image('bala', 'assets/bala.png')
        
        // ---- carrega os assets
        this.game.load.image("play", "assets/play.png");
        // --- mapa
        this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles.png');
        this.game.load.image('portal', 'assets/portal.png');

    },
    
    create : function(){
        this.game.state.start("menu");
    }
    
}