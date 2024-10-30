import { ListController } from "core";
import { useInject, useVueRef } from "../../hooks/use-inject";
import { useEffect } from "react";

function useListController() {
  const listController = useInject(ListController);
  return listController;
}

export const List = () => {
  const listController = useListController();
  useEffect(() => {
    listController.load();
  }, []);
  const userList = listController.userList;
  const userName = useVueRef(listController.userName);
  const avatar = useVueRef(listController.avatar);
  const selectIndex = useVueRef(listController.selectIndex);
  return (
    <div>
      <ul>
        {userList.map((userName, key) => (
          <li
            style={{
              listStyle: "none",
              color: selectIndex === key ? "red" : "",
              padding: "4px 0",
            }}
            key={key}
            onClick={() => {
              listController.changeSelectIndex(key);
            }}
          >
            {userName}
          </li>
        ))}
        <span>{userName}</span>
        <div>{Boolean(avatar) && <img src={avatar} />}</div>
      </ul>
    </div>
  );
};
