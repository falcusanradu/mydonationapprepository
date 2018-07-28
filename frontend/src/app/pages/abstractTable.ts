export abstract class AbstractTable {

  abstract OnFilter();

  abstract OnSort(index: number);

  sort(sortableArray: any, sortBy, sortWay: boolean) {
    if (sortWay) {
      sortableArray.sort((o1, o2) => {
        return o1[sortBy].toUpperCase() >= o2[sortBy].toUpperCase();
      });
    } else {
      sortableArray.sort((o1, o2) => {
        return o1[sortBy].toUpperCase() <= o2[sortBy].toUpperCase();
      });
    }
  }

}
