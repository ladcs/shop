import BadRequest from "../error/BadRequest";
import schemaToUpdate from "../schema/schemaToUpdate";

export default class RulesToUpdate {
  financialTeamRule = (costPrice: number, newPrice:number) => {
    if(newPrice < costPrice) throw new BadRequest("cost_price need to be higher.");
  }

  marketingTeamRule = (salesPrice: number, newPrice: number) => {
    if(salesPrice * 1.1 <= newPrice
      || salesPrice * 0.9 >= newPrice) throw new BadRequest("new value needs to be 10% of current value.");
  }

  fieldRules = (code: number, newPrice: number) => {
    const validate = schemaToUpdate.safeParse({code, newPrice});
    if(!validate.success) {
      const { issues } = validate.error;
      const { message } = issues[0];
      console.log(message);
      throw new BadRequest(message);
    }
  }
}