import {NextRequest, NextResponse} from "next/server";

import {dynamicRouteManager} from "@/lib/refine-routes";

export async function POST(request: NextRequest) {
  try {
    // Xác thực webhook từ Storyblok
    const payload = await request.json();

    // Kiểm tra secret nếu cần
    const isValidWebhook = verifyStoryblokWebhook(payload);

    if (!isValidWebhook) {
      return NextResponse.json({message: "Invalid webhook"}, {status: 403});
    }

    // Sync lại routes khi có thay đổi
    await dynamicRouteManager.syncRoutesFromStoryblok();

    return NextResponse.json({
      message: "Routes synced successfully",
    });
  } catch (error) {
    return NextResponse.json({error: "Failed to sync routes"}, {status: 500});
  }
}

function verifyStoryblokWebhook(payload: any) {
  // Implement webhook verification logic
  // So sánh secret, validate payload
  return true;
}
