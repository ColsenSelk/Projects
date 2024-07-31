using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Vector2 = Microsoft.Xna.Framework.Vector2;

namespace SpaceRace3D
{
    internal class ScrollingBackground // page based off the University Of Iowa State Com S 437 codebase
    {
        private Vector2 screenpos, origin, texturesize;
        private Texture2D mytexture;
        private int screenheight;

        public void Load(GraphicsDevice device, Texture2D backgroundTexture)
        {
            mytexture = backgroundTexture;
            screenheight = device.Viewport.Height;
            int screenwidth = device.Viewport.Width;
            origin = new Vector2(mytexture.Width / 2, mytexture.Height / 2);
            screenpos = new Vector2(screenwidth / 2, (screenheight / 2));
            texturesize = new Vector2(mytexture.Width, 0);
        }

        public void Update(float deltaX)
        {
            //screenpos.X += deltaX;
            //screenpos.X = screenpos.X % mytexture.Width;

        }

        public void Draw(SpriteBatch batch)
        {
            batch.Draw(mytexture, screenpos, null, Color.White, 0, origin, 1, SpriteEffects.None, 0f);
            batch.Draw(mytexture, screenpos - texturesize, null, Color.White, 0, origin, 1, SpriteEffects.None, 0f);
        }
    }
}
