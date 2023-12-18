import { PropsWithChildren, ReactNode, useMemo, useRef, useState } from "react";

function generateSimpleInputId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let inputId = 'input';
  for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      inputId += chars.charAt(randomIndex);
  }
  return inputId;
}

//TODO: Fare in modo che se di tipo radio, diventi obbligatorio anche il name

interface MpFlipCardProps {
  id?: string; 
  type?: 'checkbox'|'radio';
  name?: string;
}

export function MpFlipCard({ 
  children, 
  id, 
  type = 'checkbox',
  name
}: PropsWithChildren<MpFlipCardProps>) {


  const _id = useMemo(() => {
    return id ?? generateSimpleInputId();
  }, [id]);

  const front = useRef<ReactNode>();
  const back  = useRef<ReactNode>();

  if (!front.current || !back.current) {
    if (!Array.isArray(children) || children.length !== 2) {
      throw "Two children elements required for MpHoverCard to works correctly.";
    } else {
      front.current = children.filter( x => x.type === MpFlipCard.Front );
      back.current  = children.filter( x => x.type === MpFlipCard.Back );
  
      if (!front.current || !back.current) {
        throw "Provide both MpHoverCard.Back and MpHoverCard.Front slots";
      }
    }
  }


  return (
    <div className="mp_flip_card">
      <input
        type={type}
        name={name}
        id={_id}
        className="mp_flip_card__controller"
        hidden
      />

      <label 
        htmlFor={_id} 
        className="mp_flip_card__layer">
        <section className="mp_flip_card__layer__front">
          {front.current}
        </section>

        <section className="mp_flip_card__layer__back">
          {back.current}
        </section>
      </label>
    </div>
  );
}


export function Back({ children } : PropsWithChildren) {
  return <>{ children }</>;
}

MpFlipCard.Back = Back;

function Front({ children } : PropsWithChildren) {
  return <>{ children }</>;
}

MpFlipCard.Front = Front;