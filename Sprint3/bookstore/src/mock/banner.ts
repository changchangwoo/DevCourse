import { Banner } from "@/models/banner.model"
import { HttpResponse, http } from "msw"

const bannerData:Banner[] = [
    {
        id: 1,
        title : "배너 1 제목",
        description: "Banner 1 descrption",
        image : "https://picsum.photos/id/111/1200/400",
        url : "http://some.url",
        target : "_blank",
    },
    {
        id: 2,
        title : "배너 2 제목",
        description: "Banner 2 descrption",
        image : "https://picsum.photos/id/222/1200/400",
        url : "http://some.url",
        target : "selft",
    },
    {
        id: 3,
        title : "배너 3 제목",
        description: "Banner 3 descrption",
        image : "https://picsum.photos/id/33/1200/400",
        url : "http://some.url",
        target : "_blank",
    }
]
export const banners = http.get("http://127.0.0.1:9999/banners", () => {
    return HttpResponse.json(bannerData,{
        status: 200
    })
})