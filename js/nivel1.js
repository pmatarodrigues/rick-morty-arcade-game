
var nivel1 = function(game){
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

    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    google: {
      families: ['Press Start 2P']
    }
}; 

nivel1.prototype = {
        
    create : function(game){
        this.stage.backgroundColor = '#4FC3F7';
        tempo = this.game.time.now;
        tempoBala = 0;

        // ----------------------- AUDIO --------------------- //
        tiro = game.add.sound('tiro');
        laser = game.add.sound('laser');

        
        // ------------------------- MAPA --------------------- //
        map = game.add.tilemap('map');
        map.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('morty_buffed2', 'morty');
        map.addTilesetImage('background', 'background');
        map.setCollisionBetween(1, 3000);
        background = map.createLayer('background');
        layer = map.createLayer('Camada de Tiles 1');
        layer.resizeWorld();
        
        portal = this.game.add.sprite(1200, 70, 'portal');

        map.createFromObjects('portal', 14, 'portal', 0, true, false);
        this.game.physics.arcade.enable(portal);

        textoPontuacao = game.add.text(650, 540, 'Pontos: ' + window.pontos, 
                                           {fontSize: '20px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoPontuacao.fixedToCamera = true;
        textoPontuacao.font = 'Press Start 2P';
        
        textoVidas = game.add.text(910, 540, 'Vidas: ' + window.vidas, 
                                           {fontSize: '20px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        textoVidas.fixedToCamera = true;
        textoVidas.font = 'Press Start 2P';

        
        textoNivel = game.add.text(100, 540, 'NIVEL 1', 
                                           {fontSize: '40px',
                                            fill: '#fff',
                                            boundsAlignH: 'top',
                                            boundsAlignV: 'top',
                                            align: 'left'
                                           }
                                       );
        
        textoNivel.fixedToCamera = false;
        textoNivel.font = 'Press Start 2P';

        // -------- imagem do sol
        screaming_sun = this.game.add.sprite(100, 90, 'screaming_sun');

        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // ---------------------- JOGADOR ------------------ //
        jogador = this.game.add.sprite(100, this.game.world.height - 150, 'rick');
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
        map.createFromObjects('morty', 321, 'morty_buffed', 0, true, false, inimigos);
                
        inimigos.callAll('animations.add', 'animations', 'caminha_esquerda', [0, 1, 2, 3], 10, true);
        inimigos.callAll('animations.add', 'animations', 'caminha_direita', [4, 5, 6, 7], 10, true);
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

        background_intromenu = game.add.sprite(550, 320, 'nivelintro_background');
        background_intromenu.anchor.set(0.5);
        background_intromenu.fixedToCamera = true;


        textoNivelNome = game.add.text(550, 300, 'Terra do Sol Gritante', 
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

        textoNivelAviso = game.add.text(550, 350, 'Acerte nos inimigos para ganhar pontos \nAlcance o portal para mudar de Planeta', 
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
        /*
        var jogoEmPausa = false;

        
        if(jogoEmPausa){
            if(botaoPausa.isDown){
                jogoEmPausa = false;
                game.paused = false;
            }
        } else{
            if(botaoPausa.isDown){
                jogoEmPausa = true;
                game.paused = true;
            }
        }
        */
        game.physics.arcade.collide(jogador, layer);
        game.physics.arcade.collide(inimigos, layer, function(inimigos, layer){
            if(inimigos.body.blocked.right && inimigos.body.blocked.down){
                if(inimigos.vida == null){
                    inimigos.body.velocity.x = game.rnd.integerInRange(-100, -50);
                }
                inimigos.animations.play('caminha_esquerda');
            }
            if(inimigos.body.blocked.left && inimigos.body.blocked.down){
                if(inimigos.vida == null){
                    inimigos.body.velocity.x = game.rnd.integerInRange(50, 100);
                }
                inimigos.animations.play('caminha_direita');
            }
            
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
                                                        game.state.start('nivel2');
                                                     });
        tempo = this.game.time.now;
        game = this.game;
           // --- eliminar o texto de aviso do nivel após X segundos
        game.time.events.add(3000, function(){
            textoNivelAviso.destroy()
        });
        game.time.events.add(3000, function(){
            textoNivelNome.destroy()
        });
        game.time.events.add(3000, function(){
            background_intromenu.destroy();
        });

        
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
                tiro.play();
                tempoBala = tempo + SPACE_BALA;
            }
        }
    },
    // -------- inimigo foi atingido por bala
    inimigoAtingido : function(inimigos, balas){
        // ---- inimigos têm vida de 3 
        // ---- já foi atingido
        if(inimigos.vida != null){
            inimigos.vida --;
            // --- muda cor para vermelho
            inimigos.tint = 0xf44336;
            // --- aumentar a velocidade quando é atingido
            inimigos.body.velocity.x += 5;
        // --- atingido pela primeira vez 
        }else{
            inimigos.vida = 2;
            // --- muda cor para amarelo
            inimigos.body.velocity.x += 5;
            inimigos.tint = 0xFFF176;
        }
        window.pontos += 5;
        balas.kill();
        textoPontuacao.text = 'Pontos: ' + window.pontos;
        console.log('INIMIGO ATINGIDO');
        if(inimigos.vida == 0){
            inimigos.kill();
            window.pontos += 20;
        }
    },
    
    // -------- balas atingem Tiles
    destruirBala : function(balas, layer){
        balas.kill();
    }
};
