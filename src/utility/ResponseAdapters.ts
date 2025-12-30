export function convertApplicationHateoas(hateoasResponse: any) {
    if (!hateoasResponse._embedded) {
        return { items: [], meta: hateoasResponse.page };
    }

    const items = hateoasResponse._embedded.jobApplicationModelList;

    return {
        items: items,
        meta: hateoasResponse.page
    };
}