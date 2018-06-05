
var nivel3 = function(game){
    var cursors;
    var map;
    var inimigos;
    var portal;
    
    var layer;
    var jogador;
    
    var bala;
    var botaoDisparar;
}


nivel3.prototype = {
        
    create : function(game){
        this.stage.backgroundColor = '#455A64';
        tempo = this.game.time.now;
        tempoBala = 0;
        window.vidas += 5;
        vidaInimigo = 10;
        inimigoVivo = true;
        
        // ------------------------- MAPA --------------------- //
        map = game.add.tilemap('map_nivel3');
        //map.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('tiles2', 'tiles2');
        //map.addTilesetImage('final_morty', 'morty');
        map.setCollisionBetween(1, 3000);
        layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();

        textoPontuacao = game.add.text(650, 540, 'Pontos: ' + window.pontos, 
                                           {fontSize: '32px',
                                            fill: '#000',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoPontuacao.fixedToCamera = true;
        
        textoVidas = game.add.text(850, 540, 'Vidas: ' + window.vidas, 
                                           {fontSize: '32px',
                                            fill: '#000',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoVidas.fixedToCamera = true;

        
        textoNivel = game.add.text(100, 540, 'NIVEL 3', 
                                           {fontSize: '40px',
                                            fill: '#000',
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
        inimigo = this.game.add.sprite(400, 50, 'final_morty');
        inimigo.enableBody = true;
        inimigo.physicsBodyType = Phaser.Physics.ARCADE;
        this.game.physics.arcade.enable(inimigo);
        // --- criar inimigo BOSS
        inimigo.animations.add('caminha_esquerda', [0, 1, 2, 3], 10, true);
        inimigo.animations.add('caminha_direita', [5, 6, 7, 8], 10, true);
        
        inimigo.body.bounce.y = 0.3;
        inimigo.body.gravity.y = 600;
        inimigo.body.collideWorldBounds = true;
        inimigo.body.collideWorldBounds = true;
                
        
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
        
        
        balasInimigas = game.add.group();
        balasInimigas.enableBody = true;
        balasInimigas.physicsBodyType = Phaser.Physics.ARCADE;
        balasInimigas.createMultiple(20, 'bala_inimigo'); //-- cria 20 balas
        balasInimigas.setAll('anchor.x', 0.5);
        balasInimigas.setAll('anchor.y', 1);
        balasInimigas.setAll('outOfBoundsKill', true);
        balasInimigas.setAll('checkWorldBounds', true);
            
    },
    
    update : function(game){        
    
        game.physics.arcade.collide(inimigo, jogador, function(jogador, inimigo){
                                                        vidas--;
                                                        textoVidas.text = 'Vidas: ' + window.vidas;
                                                        if(vidas == 0){
                                                            jogador.kill();
                                                            game.state.start('gameover');
                                                        }
                                                    });
        game.physics.arcade.collide(inimigo, balas, this.inimigoAtingido);
        game.physics.arcade.collide(layer, balas, function(balas, layer){
                                                    balas.kill();
                                                  });
        game.physics.arcade.collide(inimigo, layer);
        game.physics.arcade.collide(jogador, layer);
        game.physics.arcade.collide(jogador, balasInimigas, function(jogador, balasInimigas){
                                                                vidas--;
                                                                textoVidas.text = 'Vidas: ' + window.vidas;
                                                                balasInimigas.kill();
                                                                if(vidas == 0){
                                                                    inimigo.kill();
                                                                    game.state.start('gameover');
                                                                }
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
        // --------------- inimigo persegue o jogador
            // -------- para a esquerda
            if(inimigo.body.x > jogador.body.x){
                inimigo.animations.play('caminha_esquerda');
                inimigo.body.velocity.x = -150;
            }
            // ----------- para a direita
            if(inimigo.body.x < jogador.body.x){
                inimigo.animations.play('caminha_direita');
                inimigo.body.velocity.x = 150;
            }
            // --------- para cima
            if(inimigo.body.y < jogador.body.y){
                inimigo.body.velocity.y = 100;
            }
            this.inimigoDisparaBala(inimigo, jogador);
        
        if(vidaInimigo == 0){
            game.state.start('vitoria');
        }
    },
    
    inimigoDisparaBala : function(inimigo, jogador){
        var VEL_BALA = 300;
        var SPACE_BALA_INIMIGA = 1000;
        var balaInimiga = balasInimigas.getFirstExists(false);

        if(inimigoVivo){
            if(tempo > tempoBala){
                if(balaInimiga){
                        balaInimiga.reset(inimigo.body.x + 20, inimigo.body.y + 120);
                    // --------- bala é disparada na direção do jogador
                        balaInimiga.rotation = this.game.physics.arcade.moveToObject(balaInimiga, jogador, VEL_BALA);
                        //balaInimiga.body.velocity.x = VEL_BALA;
                        //balaInimiga.body.velocity.y = jogador.body.velocity.y;

                    tempoBala = tempo + SPACE_BALA_INIMIGA;
                }
            }
        }
    },
    
    
    dispararBala : function(){
        var VEL_BALA = 300;
        var SPACE_BALA = 250;
        var bala = balas.getFirstExists(false);

        if(tempo > tempoBala){
            if(bala){    
                // ----------- se o jogador anda para a direita
                if(jogador.body.velocity.x > 0){
                    bala.reset(jogador.x + 17, jogador.y + 15);
                    bala.body.velocity.x = VEL_BALA;

                // ----------- se o jogador anda para a esquerda
                } else if(jogador.body.velocity.x < 0){
                    bala.reset(jogador.x - 17, jogador.y + 15);
                    bala.body.velocity.x = -VEL_BALA;
                // ----------- se o jogador está parado 
                } else{
                    bala.body.velocity.x = 0;
                }   
                tempoBala = tempo + SPACE_BALA;
            }
        }
    },
    // -------- inimigo foi atingido por bala
    inimigoAtingido : function(inimigo, balas){
        // ---- se o inimigo nao tem mais vida morre
        if(vidaInimigo == 0){
            inimigo.kill();    
            inimigoVivo = false;
        }else{
            vidaInimigo--;
        }
        balas.kill();
        window.pontos += 20;
        textoPontuacao.text = 'Pontos: ' + window.pontos;
        console.log('INIMIGO MORREU');
    },
    
    
};
