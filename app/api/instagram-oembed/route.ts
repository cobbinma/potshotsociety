import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    )
  }

  try {
    // Fetch from Instagram's oEmbed API
    const response = await fetch(
      `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}&maxwidth=540&omitscript=false`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Next.js)',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Instagram API returned ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Instagram oEmbed error:', error)
    // Return a fallback response instead of an error
    return NextResponse.json(
      { 
        error: 'Failed to fetch embed',
        fallback: true 
      },
      { status: 200 } // Return 200 so the client can handle fallback
    )
  }
}
