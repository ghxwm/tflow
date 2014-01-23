/**
 * CSDN首页中"图片轮播"和"导航展开"功能
 * @author  liuwei@csdn.net(瓜籽：可以再好一点点！)
 */
var csdn = csdn || {};

csdn.SwapImage = ( function () {
   /**
    * 图片轮播
    * @param   [ Object ]   ops
    * @description
    *      ops.imgArray:   轮播图片
    */
    function _SwapImage ( ops ) {
        this.imgArray = ops.swapRoot.find( 'a' );
        this.maxImgLength = this.imgArray.length;

        this.tagArray = null;
        this.currentImage = null;
        this.currentTag = null;
        this.nextImage = null;
        this.intervalTime = null;

        this.duration = 500;    // 图片渐变的速度
        this.swapTime = 3000;   // 图片交换的间隔
        this.index = -1;    // 图片下标，默认从-1开始
        this.nextIndex = -1; // 下一张图片的下标，默认从-1开始

        this.init();
    };

    _SwapImage.prototype = {
        init: function () {
            var me = this;

            this.imgArray.each( function ( i, item ) {
                i == 0
                    ? $( item ).css( { 'opacity': 1, 'display': 'list-item' } )
                    : $( item ).css( { 'opacity': 0, 'display': 'none' } );
            } );

            this.creatImgTags();
            setTimeout( function () {
                me.reCall.call( me );
                me.tagEvent.call( me );
                me.imgEvent.call( me );
            }, 1500 );
        },

        /**
         * 重复调用swapImg()函数
         * @description
         *      方法之间需要重复调用swapImg()时，调用此方法
         */
        reCall: function () {
            var me = this;
            var img, nextIndex;

            this.index++;
            this.nextIndex = this.index + 1;
            this.currentImage = this.index < this.maxImgLength ? this.imgArray.get( this.index ) : this.imgArray.get( 0 );
            this.nextImage = this.index < this.maxImgLength - 1 ? this.imgArray.get( this.index + 1 ) : this.imgArray.get( 0 );
            this.index = this.index < this.maxImgLength - 1 ? this.index : -1;
            this.nextIndex = this.nextIndex < this.maxImgLength ? this.nextIndex : 0;

            this.swapImg( this.currentImage, this.nextImage );
        },

        /**
         * 图片交换
         * @param   [ Object ]  cur
         * @param   [ Object ]  next
         * @description
         *      cur:    当前图片
         *      next:   下一张图片
         */
        swapImg: function ( cur, next ) {
            var me = this;

            // 消失效果
            this.animate( {
                img: cur,
                opc: 0,
                complete: function () {
                    $( cur ).css( 'display', 'none' );
                    $( me.currentImage ).css( 'opacity', '' );
                }
            } );

            // 显示效果
            $( next ).css( {
                display: 'list-item',
                opacity: 0
            } );

            this.animate( {
                img: next,
                opc: 1,
                complete: function () {
                    $( me.nextImage ).css( 'opacity', '' );
                    me.currentImage = next;
                    me.swapTag.call( me, me.nextIndex );
                    me.intervalCall();
                }
            } );
        },

        /**
         * 交换功能动画
         * @param   [ Object ]  conf
         * @description
         *      conf.img:   当前图片
         *      conf.opc:   当前图片透明度
         */
        animate: function ( conf ) {
            var me = this;
            var img = $( conf.img );

            img.animate( {
                opacity: conf.opc
            }, {
                duration: me.duration,
                easing: 'swing',
                step: function () {
                    var step = ( typeof conf.step == 'function' ) ? conf.step : function () {};
                    step();
                },
                complete: function () {
                    var complete = ( typeof conf.complete == 'function' ) ? conf.complete : function () {};
                    complete();
                }
            } );
        },

        /**
         * 循环调用reCall()
         */
        intervalCall: function () {
            var me  = this;

            this.intervalTime = setTimeout( function () {
                me.reCall.call( me );
                clearTimeout( me.intervalTime );
            }, this.swapTime );
        },

        /**
         * 创建图片对应的标志
         * @description
         *      根据图片的个数，创建对应的状态标志
         */
        creatImgTags: function () {
            var tagRoot = $( '.js-tagRoot' );

            for ( var i = 0; i < this.maxImgLength; i++ )
            {
                i == 0 ? tagRoot.append( '<li class="current"></li>' ) : tagRoot.append( '<li></li>' );
            }
            this.tagArray = $( '.hot' ).find( 'li' );
            this.currentTag = this.tagArray.get( 0 );
        },

        /**
         * 交换显示图片所对应的指示标志
         * @param   [ Number ]  index
         * @description
         *      index:  当前图片所对应标志的下标
         */
        swapTag: function ( index ) {
            var curTag = this.tagArray.get( index );

            this.currentTag && $( this.currentTag ).removeClass( 'current' );
            $( curTag ).addClass( 'current' );
            this.currentTag = curTag;
        },

        // 选择指示标志交换相应图片
        tagEvent: function () {
            var me = this;

            this.tagArray.each( function ( i, item ) {
                $( item ).bind( 'click', function () {
                    if ( !$( this ).hasClass( 'current' ) )
                    {
                        var cur = me.imgArray.get( i );
                        var next = me.imgArray.get( i + 1 );

                        clearTimeout( me.intervalTime );
                        me.index = i - 1;
                        me.nextIndex = me.index + 1;

                        $( me.currentImage ).stop( true, true );
                        $( me.nextImage ).stop( true, true );

                        me.swapImg( me.currentImage, cur );
                        me.swapTag( i );
                    }
                } );
            } );
        },

        // 暂停图片轮播
        imgEvent: function () {
            var me = this;

            this.imgArray.each( function ( i, item ) {
                $( item ).bind( 'mouseover', function () {
                    var over = me.imgArray.get( i );

                    $( over ).stop( true, true );
                    clearTimeout( me.intervalTime );
                } );

                $( item ).bind( 'mouseout', function () {
                    me.intervalCall();
                } );
            } );
        }
    };

    return {
        swap: function ( ops ) {
            new _SwapImage( ops );
        }
    }
} )();

/**
 * 导航展开
 * @param   [ Object ]  ops
 * @description
 *      ops.layer:  显示层
 *      ops.openBtn:    显示开关
 */
csdn.openLayer = ( function () {
    function _layer ( ops ) {
        var layer = ops.layer;
        var openBtn = ops.openBtn;
        var fadeTime = 100;

        openBtn.bind( {
            mouseenter: function () {
                layer.stop( true, true );
                layer.fadeIn( fadeTime );
            },
            mouseleave: function () {
                layer.stop( true, true );
                layer.fadeOut( fadeTime );
            }
        } );

        openBtn.bind( 'click', function() {
            if ( layer.css( 'display' ) == 'none' )
            {
                layer.stop( true, true );
                layer.fadeIn( fadeTime );
            }
            else
            {
                layer.stop( true, true );
                layer.fadeOut( fadeTime );
            }
        } );
    };

    return {
        layer: function ( ops ) {
            _layer( ops );
        }
    }
} )();
