/**
 * RuddyJS Extensions - Scroll
 *
 * @package     ruddy-scroll
 * @author      Gil Nimer <info@ruddymonkey.com>
 * @author      Nick Vlug <info@ruddy.nl>
 * @copyright   RuddyJS licensed under MIT. Copyright (c) 2017 Ruddy Monkey & ruddy.nl
 */

var $Export = $Export || require('ruddy').export;

$Export
    .module(
        'Scroll',
        '+scroll',
        'ruddy-scroll'
    )
    .include([
        'window',
        '@core',
        '@function',
        '@ruddy'
    ])
    .init(
        this,
        module,
        function (window, __core, $func, $r) {
            /**
             * scroll page both X and Y axis
             *
             * @param x
             * @param y
             * @param settings
             */
            $r.assign('scroll', $func (function(x, y, settings) {
                var
                    settings    = settings              || {},
                    duration    = settings.duration     || 1,
                    delay       = settings.delay        || 0,
                    action      = settings.action       || false,
                    callback    = settings.callback     || false,
                    condition   = settings.condition    || true,
                    delta       = settings.delta        || undefined,
                    element     = settings.element      || this.el,
                    minX        = element.scrollLeft    || 0,
                    minY        = element.scrollTop     || 0;

                this.animate({
                    delay:      delay,
                    duration:   duration,
                    delta:      delta,
                    startPoint: {x: minX, y: minY},
                    endPoint:   {x: x, y: y},
                    style: function(getValue, start, end, delta) {
                        if(minX == x && minY == y)
                            return;

                        element.scrollLeft = getValue(start.x, end.x, delta);
                        element.scrollTop = getValue(start.y, end.y, delta);
                    },
                    action: action,
                    callback: callback,
                    condition: condition
                });
            }));

            /**
             * scroll page the X axis only
             *
             * @param to
             * @param settings
             */
            $r.assign('scrollX', $func (function(to, settings) {
                var
                    settings    = settings              || {},
                    duration    = settings.duration     || 1,
                    delay       = settings.delay        || 0,
                    action      = settings.action       || false,
                    callback    = settings.callback     || false,
                    condition   = settings.condition    || true,
                    delta       = settings.delta        || undefined,
                    element     = settings.element      || this.el,
                    minX        = element.scrollLeft    || 0;

                this.animate({
                    delay:      delay,
                    duration:   duration,
                    delta:      delta,
                    startPoint: minX,
                    endPoint:   to,
                    style: $func(function(getValue, start, end, delta) {
                        if(minX == to)
                            return;

                        element.scrollLeft = getValue(start, end, delta);
                    }).bind(this),
                    action: action,
                    callback: callback,
                    condition: condition
                });
            }));

            /**
             * scroll page the Y axis only
             *
             * @param to
             * @param settings
             */
            $r.assign('scrollY', $func (function(to, settings)
            {
                var
                    settings    = settings              || {},
                    duration    = settings.duration     || 1,
                    delay       = settings.delay        || 0,
                    action      = settings.action       || false,
                    callback    = settings.callback     || false,
                    condition   = settings.condition    || true,
                    delta       = settings.delta        || undefined,
                    element     = settings.element      || this.el,
                    minY        = element.scrollTop     || 0;

                this.animate({
                    delay:      delay,
                    duration:   duration,
                    delta:      delta,
                    startPoint: minY,
                    endPoint:   to,
                    style: $func(function(getValue, start, end, delta) {
                        if(minY == end)
                            return;

                        element.scrollTop = getValue(start, end, delta);
                    }).bind(this),
                    action: action,
                    callback: callback,
                    condition: condition
                });
            }));

            return {xy: $r.scroll, x: $r.scrollX, y: $r.scrollY};
        });