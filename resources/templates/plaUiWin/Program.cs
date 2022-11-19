using Pla.Lib;
using SkiaSharp;

Pla.Win.App.PlaMain(new Ctx());

class Ctx : IContext, IControl, IPainter
{
    List<SKPoint> points = new List<SKPoint>();
    private IEngine engine;

    public void Click(SKPoint argsLocation)
    {
        points.Add(argsLocation);
        engine.RequestRefresh();
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
        this.engine = engine;
    }

    public void KeyDown(uint key)
    {
    }

    public void Paint(SKImageInfo info, SKSurface surface)
    {
        using(var paint =new SKPaint())
        {
            foreach(var p in this.points)
            {
                surface
                    .Canvas
                    .DrawCircle(p, 10, paint);
            }
        }
    }
}