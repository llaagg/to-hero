// https://github.com/Lopla/Pla
//"Gtk: libgtk-3-0.dll, libgtk-3.so.0, libgtk-3.0.dylib, gtk-3.dll"

using Pla.Lib;
using SkiaSharp;

Pla.Gtk.App.PlaMain(new Ctx());

class Ctx : IContext, IControl, IPainter
{
    public void Click(SKPoint argsLocation)
    {
    }

    public IControl GetControl()
    {
        return this;
    }

    public IPainter GetPainter()
    {
        return this;
    }

    public void Init(IEngine engine)
    {
        
    }

    public void KeyDown(uint key)
    {
    }

    public void Paint(SKImageInfo info, SKSurface surface)
    {
        surface
            .Canvas
            .DrawPoint(20,20, new SKPaint());
    }
}