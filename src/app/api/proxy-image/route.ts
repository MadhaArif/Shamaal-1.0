import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wikiFile = searchParams.get('wikiFile');
  let url = searchParams.get('url');

  try {
    if (wikiFile) {
      const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=File:${encodeURIComponent(wikiFile)}&format=json`;
      const apiRes = await fetch(apiUrl, { headers: { 'User-Agent': 'ShamaalApp/1.0 (https://shamaal.com)' } });
      const apiData = await apiRes.json();
      
      const pages = apiData.query?.pages;
      if (pages) {
        const pageIds = Object.keys(pages);
        if (pageIds.length > 0 && pages[pageIds[0]]?.imageinfo?.[0]?.url) {
          url = pages[pageIds[0]].imageinfo[0].url;
        }
      }
    }

    if (!url) {
      // Fallback high-quality image if URL resolution fails
      url = "https://images.unsplash.com/photo-1542359649-31e03cd4d909?auto=format&fit=crop&q=80&w=2500";
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Proxy image error:', error);
    return new NextResponse('Internal Server Error fetching image', { status: 500 });
  }
}
