import React, {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import ActivityStore, {Activity} from "@stores/ActivityStore";
import Input from "@ui/Input";
import cn from "classnames";
import Icon from "@ui/Icon";

interface ActivityCommentProps {
  activity: Activity;
}

const ActivityComment = observer(({ activity }: ActivityCommentProps) => {
  return (
    <span>{activity.comment}</span>
  );
  // const [activeAction, setActiveAction] = useState(false);
  // const [comment, setComment] = useState(activity.comment);
  //
  // const ref = useRef(null);
  //
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setComment(ActivityStore.list.find(_activity => _activity.name === activity.name).comment);
  //       setActiveAction(false);
  //     }
  //   }
  //
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ref]);
  //
  // return (
  //   <div className={'flex justify-between items-center gap-[10px]'} ref={ref}>
  //     <div className={'flex-grow min-h-[34px] group flex'}>
  //       <span className={cn(
  //         'px-[15px] py-[7px] min-h-[35px] rounded-[5px] w-full', {
  //           ['group-hover:hidden']: !activeAction,
  //           ['hidden']: activeAction,
  //         }
  //       )}>{comment}</span>
  //       <Input
  //         type={'text'}
  //         className={cn(
  //           'px-[15px] py-[7px] min-h-[34px] rounded-[5px] w-full', {
  //             ['hidden group-hover:flex']: !activeAction,
  //             ['flex']: activeAction,
  //           }
  //         )}
  //         value={comment}
  //         onChange={evt => {
  //           setComment(evt.target.value);
  //           setActiveAction(true);
  //         }}
  //       />
  //     </div>
  //     <span onClick={() => {
  //       ActivityStore.setComment(activity.name, comment);
  //       setActiveAction(false);
  //     }} className={cn('cursor-pointer', {
  //       ['invisible']: !activeAction,
  //       ['visible']: activeAction,
  //     })}>
  //       <Icon iconName={'checkCircle'} className={'h-[15px]'} />
  //     </span>
  //   </div>
  // );
});

export default ActivityComment;
