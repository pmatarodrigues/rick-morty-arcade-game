
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


WebFontConfig = {

    //active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    google: {
      families: ['Press Start 2P']
    }
}; 

nivel3.prototype = {
        
    create : function(game){
        this.stage.backgroundColor = '#455A64';
        tempo = this.game.time.now;
        tempoBala = 0;
        window.vidas += 5;
        vidaInimigo = 10;
        inimigoVivo = true;
        inimigoPodeDisparar = false;

        // ------------------------ AUDIO --------------------- // 
        tiro = game.add.sound('tiro');
        laser = game.add.sound('laser');

        
        // ------------------------- MAPA --------------------- //
        map = game.add.tilemap('map_nivel3');
        //map.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('tiles2', 'tiles2');
        //map.addTilesetImage('final_morty', 'morty');
        map.setCollisionBetween(1, 3000);
        layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();

        layerBalasNaoPassaveis = map.createLayer('Camada de Tiles 2');
        

        textoPontuacao = game.add.text(550, 540, 'Pontos: ' + window.pontos, 
                                           {fontSize: '20px',
                                            fill: '#000',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoPontuacao.fixedToCamera = true;
        textoPontuacao.font = 'Press Start 2P';

        
        textoVidas = game.add.text(850, 550, 'Vidas: ' + window.vidas, 
                                           {fontSize: '20px',
                                            fill: '#000',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoVidas.fixedToCamera = true;
        textoVidas.font = 'Press Start 2P';

        
        textoNivel = game.add.text(100, 540, 'NIVEL 3', 
                                           {fontSize: '40px',
                                            fill: '#000',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        
        textoNivel.fixedToCamera = false;
        textoNivel.font = 'Press Start 2P';

        textoVidaInimigo = game.add.text(400, 50, vidaInimigo + ' HP', 
                                           {fontSize: '20px',
                                            fill: '#000',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        
        textoVidas.fixedToCamera = false;
        textoVidaInimigo.font = 'Press Start 2P';

        
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


        background_intromenu = game.add.sprite(550, 320, 'nivelintro_background');
        background_intromenu.anchor.set(0.5);
        background_intromenu.fixedToCamera = true;


        textoNivelNome = game.add.text(550, 300, 'Final Boss', 
                                           {fontSize: '23px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoNivelNome.anchor.set(0.5);
        textoNivelNome.fixedToCamera = true;
        textoNivelNome.font = 'Press Start 2P'; 

        textoNivelAviso = game.add.text(550, 350, 'Evite ser atingido pelos mísseis do Exoskeleton Morty', 
                                           {fontSize: '10px',
                                            fill: '#FFF',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                    );
        textoNivelAviso.anchor.set(0.5);
        textoNivelAviso.fixedToCamera = true;
        textoNivelAviso.font = 'Press Start 2P';

        // -- botão de pausa do jogo
        // -- -----------------------------------------
        
        this.btnPausa = this.add.button( 1100, 10, 'pausa', 
                                           this.menuPausa, this);
        this.btnPausa.anchor.set(1, 0);
        this.btnPausa.input.useHandCursor = true;
        this.btnPausa.fixedToCamera = true;
        
        // -- -----------------------------------------
            
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
        game.physics.arcade.collide(balasInimigas, layerBalasNaoPassaveis);
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

            // --- eliminar o texto de aviso do nivel após X segundos
        game.time.events.add(3000, function(){
            textoNivelAviso.destroy();
            textoNivelNome.destroy();
            background_intromenu.destroy();
            inimigoPodeDisparar = true;
        });
        //game.time.events.add(3000, function(){textoNivelNome.destroy()});
        //game.time.events.add(3000, function(){background_intromenu.destroy()});
        //game.time.events.add(3000, function(){inimigoPodeDisparar = true});
        
        textoVidaInimigo.x = inimigo.body.x;
        textoVidaInimigo.y = inimigo.body.y - 10;
        
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
        // --- inimigo não pode disparar enquanto não desaparcer a janela de introdução do nivel
        if(inimigoPodeDisparar == true){
            this.inimigoDisparaBala(inimigo, jogador);
        }
        if(vidaInimigo == 0){
            game.state.start('vitoria');
        }
    },

    menuPausa: function() {
        // -- Estado do jogo em "PAUSE"
        this.game.paused = true;
        
        background_pausa = this.game.add.sprite(550, 320, 'nivelintro_background');
        background_pausa.anchor.set(0.5);
        
        textoPausa = this.game.add.text(550, 300, 'PAUSA', 
                                           {fontSize: '20px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoPausa.fixedToCamera = true;
        textoPausa.anchor.set(0.5);
        textoPausa.font = 'Press Start 2P';
        descricaoPausa = this.game.add.text(550, 350, 'Clique no ecrã para voltar ao jogo', 
                                           {fontSize: '15px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        descricaoPausa.fixedToCamera = true;
        descricaoPausa.anchor.set(0.5);
        descricaoPausa.font = 'Press Start 2P';
        
        // -- função adicionada que irá aguardar que um qualquer tecla seja pressionada
        // -- -----------------------------------------
        this.input.onDown.add(function(){
                // -- "destrói" a mensagem de texto
                background_pausa.destroy();
                textoPausa.destroy();
                descricaoPausa.destroy();
                // -- retira o estado do jogo de "PAUSE"
                this.game.paused = false;
        }, this);
        // -- -----------------------------------------
    },
    
    inimigoDisparaBala : function(inimigo, jogador){
        var VEL_BALA = 300;
        var SPACE_BALA_INIMIGA = 1000;
        var balaInimiga = balasInimigas.getFirstExists(false);

        if(inimigoVivo){
            if(tempo > tempoBala){
                if(balaInimiga){
                        balaInimiga.reset(inimigo.body.x + 20, inimigo.body.y + 120);
                        laser.play("",0,0.5);
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
                tiro.play("",0,0.5);
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
        textoVidaInimigo.text = vidaInimigo + ' HP';
        console.log('INIMIGO MORREU');
    },
    
    
};
