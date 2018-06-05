
var nivel2 = function(game){
    var cursors;
    var map;
    var inimigos;
    var portal;
    
    var layer;
    var jogador;
    
    var bala;
    var botaoDisparar;
}


nivel2.prototype = {
        
    create : function(game){
        this.stage.backgroundColor = '#3F51B5';
        pontos = 0;
        tempo = this.game.time.now;
        tempoBala = 0;
        
        // ------------------------- MAPA --------------------- //
        map = game.add.tilemap('map_nivel2');
        map.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('tiles2', 'tiles2');
        map.addTilesetImage('morty_buffed2', 'morty');
        //map.addTilesetImage('background', 'background');
        map.setCollisionBetween(1, 3000);
        //background = map.createLayer('background');
        layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();
        
        portal = this.game.add.sprite(1200, 70, 'portal');
        map.createFromObjects('portal', 14, 'portal', 0, true, false);
        this.game.physics.arcade.enable(portal);
        
        maisVidas = game.add.group();
        maisVidas.enableBody = true;
        maisVidas.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.arcade.enable(maisVidas);
        // --- criar objetos 'morty' no Tile
        map.createFromObjects('vidas', 200, 'vidas', 0, true, false, maisVidas);

        textoPontuacao = game.add.text(700, 540, 'Pontos: ' + window.pontos, 
                                           {fontSize: '32px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoPontuacao.fixedToCamera = true;
        
        textoVidas = game.add.text(910, 540, 'Vidas: ' + window.vidas, 
                                           {fontSize: '32px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoVidas.fixedToCamera = true;

        
        textoNivel = game.add.text(100, 540, 'NIVEL 2', 
                                           {fontSize: '40px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        
        textoNivel.fixedToCamera = false;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // ---------------------- JOGADOR ------------------ //
        jogador = this.game.add.sprite(250, this.game.world.height - 150, 'rick');
        // -- ativar fisicas no jogador
        this.game.physics.arcade.enable(jogador);
        
        jogador.anchor.set(0.5);
        jogador.animations.add('caminha_esquerda', [0, 1, 2, 3], 10, true);
        jogador.animations.add('caminha_direita', [5, 6, 7, 8], 10, true);
        
        jogador.body.bounce.y = 0.3;
        jogador.body.gravity.y = 900;
        jogador.body.collideWorldBounds = true;
        jogador.body.collideWorldBounds = true;
        // -- teclas do cursor
        teclas_cursores = this.game.input.keyboard.createCursorKeys();
        game.camera.follow(jogador);
        // ---------------------------------------------------//

        cursors = game.input.keyboard.createCursorKeys();
        
        // ---------------------- INIMIGOS ------------------ //
        inimigos = game.add.group();
        inimigos.enableBody = true;
        inimigos.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.arcade.enable(inimigos);
        // --- criar objetos 'morty' no Tile
        map.createFromObjects('morty', 321, 'anomaly_morty', 0, true, false, inimigos);
                
        inimigos.callAll('animations.add', 'animations', 'caminha_direita', [0, 1, 2, 3], 10, true);
        inimigos.callAll('animations.add', 'animations', 'caminha_esquerda', [4, 5, 6, 7], 10, true);
        inimigos.setAll('body.bounce.x', 1);
        inimigos.setAll('body.gravity.y', 500);
        
        inimigos.setAll('body.velocity.x', game.rnd.integerInRange(-100, -50));
        inimigos.callAll('animations.play', 'animations', 'caminha_esquerda');
        //--------------------------------------------------- //
        
        // --------------------- BALAS ----------------------//
        balas = game.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'bala'); //-- cria 20 balas
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);
        
        botaoDisparar = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    
    },
    
    update : function(game){
        game.physics.arcade.collide(jogador, layer);
        game.physics.arcade.collide(inimigos, layer, function(inimigos, layer){
            if(inimigos.body.blocked.right && inimigos.body.blocked.down){
                inimigos.body.velocity.x = game.rnd.integerInRange(-100, -50);
                inimigos.animations.play('caminha_esquerda');
            }
            if(inimigos.body.blocked.left && inimigos.body.blocked.down){
                inimigos.body.velocity.x = game.rnd.integerInRange(50, 100);
                inimigos.animations.play('caminha_direita');
            }
            
        });
        game.physics.arcade.collide(maisVidas, jogador, function(jogador, maisVidas){
                                                            maisVidas.kill();
                                                            window.vidas += 1;
                                                        });
        game.physics.arcade.collide(inimigos, jogador, function(jogador, inimigos){
                                        window.vidas--;
                                        textoVidas.text = 'Vidas: ' + window.vidas;
                                        inimigos.kill();
                                        if(window.vidas == 0){
                                            game.state.start('gameover');
                                        }
                                    });
        game.physics.arcade.collide(balas, layer, this.destruirBala);
        game.physics.arcade.collide(inimigos, balas, this.inimigoAtingido);
        game.physics.arcade.collide(jogador, portal, function(jogador, portal){
                                                        portal.kill();
                                                        game.state.start('nivel3');
                                                     });        
        
        
        tempo = this.game.time.now;
        game = this.game;
        
        
        jogador.body.velocity.x = 0;
        
        // ----- verifica se clica na seta esquerda
        if(teclas_cursores.left.isDown){
            jogador.body.velocity.x = -150;
            jogador.animations.play('caminha_esquerda');
            // ----- verifica se clica na seta direita
        }else if (teclas_cursores.right.isDown ){
            jogador.body.velocity.x = 150;
            jogador.animations.play('caminha_direita');
        }else{
            jogador.animations.stop();
            jogador.frame = 4;
        }
        
        // -- salto do jogador
        if( teclas_cursores.up.isDown && jogador.body.onFloor()){
            jogador.body.velocity.y = -470;
        }   
        // --- clica no ESPAÇO
        if(botaoDisparar.isDown){
            this.dispararBala();
        }
        
    },
    
    dispararBala : function(){
        var VEL_BALA = 300;
        var SPACE_BALA = 250;
        var bala = balas.getFirstExists(false);

        if(tempo > tempoBala){
            if(bala){    
                // ----------- jogador anda para a direita
                if(jogador.body.velocity.x > 0){
                    bala.reset(jogador.x + 17, jogador.y + 15);
                    bala.body.velocity.x = VEL_BALA;
                // ----------- jogador anda para a esquerda
                } else if(jogador.body.velocity.x < 0){
                    bala.reset(jogador.x - 17, jogador.y + 15);
                    bala.body.velocity.x = -VEL_BALA;
                // ----------- jogador está parado 
                } else{
                    bala.body.velocity.x = 0;
                }   
                tempoBala = tempo + SPACE_BALA;
            }
        }
    },
    // -------- inimigo foi atingido por bala
    inimigoAtingido : function(inimigos, balas){
        inimigos.kill();
        balas.kill();
        window.pontos += 20;
        textoPontuacao.text = 'Pontos: ' + window.pontos;
        console.log('INIMIGO MORREU');
    },
    
    // -------- balas atingem Tiles
    destruirBala : function(balas, layer){
        balas.kill();
    }
    
};
