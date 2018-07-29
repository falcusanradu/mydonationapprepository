export abstract class AbstractTable {

  abstract OnFilter(event);

  abstract OnSort(index: number);

  protected sort(array: any, sortBy, sortWay: boolean) {
    if (sortWay) {
      return array.sort((o1, o2) => {
        return o1[sortBy].toUpperCase() >= o2[sortBy].toUpperCase();
      });
    } else {
      return array.sort((o1, o2) => {
        return o1[sortBy].toUpperCase() <= o2[sortBy].toUpperCase();
      });
    }
  }

  protected filter(array: any, filterBy: string, value: string) {
   return array.filter((element) => {
      return element[filterBy].toUpperCase().includes(value.toUpperCase());
    });
  }

}
