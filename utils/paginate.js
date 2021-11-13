import lodash from 'lodash';

export function paginate(item, pageNumber, pageSize){
    const startIndex = (pageNumber - 1) * pageSize;
    return lodash(item)
            .slice(startIndex)
            .take(pageSize)
            .value();
}