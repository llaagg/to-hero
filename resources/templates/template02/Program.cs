using Pla.Lib;
using SkiaSharp;


//"Gtk: libgtk-3-0.dll, libgtk-3.so.0, libgtk-3.0.dylib, gtk-3.dll"

Pla.Gtk.App.PlaMain(new Ctx());

class Co : IControl
{
    public void Click(SKPoint argsLocation)
    {
        
    }

    public void KeyDown(uint key)
    {
        
    }
}

class Pt : IPainter
{
    public void Paint(SKImageInfo info, SKSurface surface)
    {
        surface.Canvas.DrawPoint(20,20, new SKPaint());
    }
}

class Ctx : IContext
{
    public IControl GetControl()
    {
        return new Co();
    }

    public IPainter GetPainter()
    {
        return new Pt();
    }

    public void Init(IEngine engine)
    {
        
    }
}