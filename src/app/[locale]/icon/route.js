import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#1a237e', // Dark blue background
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff94', // Crypto-green color
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          transform: 'rotate(-15deg)', // Slight tilt for style
        }}
      >
        $
      </div>
    ),
    {
      ...size,
    }
  );
}
