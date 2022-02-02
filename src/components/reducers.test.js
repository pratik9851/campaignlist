import CampaignReducer from "../redux/CampaignReducer";
import { ADD_ONLIST,REMOVE_ONE, SEARCH_KEYWORD } from "../redux/ActionType";


const initialstate = {
    list: [],
    alldetail: [],
    search: "",
  };

  const action={
      type:ADD_ONLIST ,
      payload:[{
          _id:1,
          type:"one",
          company:"test"
      }]
  }


  test("added on list",()=>{

    expect(CampaignReducer(initialstate,action)).toEqual({
        list: [{
            _id:1,
            type:"one",
            company:"test"
        }],
        alldetail: [],
        search: "",
      })

  })



  const initialstate1 = {
    list: [{
        _id:1,
        type:"one",
        company:"test"
    }],
    alldetail: [],
    search: "",
  };

  const action2={
    type:REMOVE_ONE,
    payload:1
}



  test("delete one",()=>{
      expect(CampaignReducer(initialstate1,action2)).toEqual({
        list: [],
        alldetail: [],
        search: "",
      })
  })


  const initialstate3 = {
    list: [],
    alldetail: [],
    search: "",
  };

  const action3={
    type:SEARCH_KEYWORD,
    payload:"a",
}

test("added in search state",()=>{
    expect(CampaignReducer(initialstate3,action3)).toEqual({
        list: [],
        alldetail: [],
        search: "a",
      })
})