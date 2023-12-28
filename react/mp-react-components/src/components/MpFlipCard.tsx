import { PropsWithChildren, ReactNode, useMemo, useRef } from "react";

function generateSimpleInputId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let inputId = 'input';
  for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      inputId += chars.charAt(randomIndex);
  }
  return inputId;
}

export type MpFlipCardType = 'radio'    | 'checkbox';
export type MpFlipCardDir  = 'vertical' | undefined;

type MpFlipCardBase = {
  /**
   * If not provided it will be generated
   * It links the \<label for="{id}"\> element to the \<input id="{id}"\> element
   */
  id?: string;

  /**
   * It define the transition direction
   * - vertical
   * - undefined => horizontal (TODO: non usare undef)
   */
  direction?: MpFlipCardDir;

  /**
   * Specifies the type of FlipCard. 
   * Choose between 'radio' for single selection (requires 'name' property) 
   * or 'checkbox' for multiple selection. 
   */
  type: MpFlipCardType;

  /**
   * Specifies the name of the form element
   * [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  name?: string;
}

type MpFlipCardRadioVariant = {
  type: Extract<MpFlipCardType, 'radio'>;
  name: string;
} & MpFlipCardBase;

type MpFlipCardCheckboxVariant = {
  type: Extract<MpFlipCardType, 'checkbox'>;
  name?: string;
} & MpFlipCardBase;

type MpFlipCardProps = MpFlipCardCheckboxVariant | MpFlipCardRadioVariant;

export function MpFlipCard({ 
  children, 
  id, 
  type = 'checkbox',
  name,
  direction
}: PropsWithChildren<MpFlipCardProps>) {


  const _id = useMemo(() => {
    return id ?? generateSimpleInputId();
  }, [id]);

  const front = useRef<ReactNode>();
  const back  = useRef<ReactNode>();

  if (!front.current || !back.current) {
    if (!Array.isArray(children) || children.length !== 2) {
      throw "Two children elements required for MpFlipCard to works correctly.";
    } else {
      front.current = children.filter( x => x.type === MpFlipCard.Front );
      back.current  = children.filter( x => x.type === MpFlipCard.Back );
  
      if (!front.current || !back.current) {
        throw "Provide both MpFlipCard.Back and MpFlipCard.Front slots";
      }
    }
  }


  return (
    <div 
      className={`
        mp_flip_card 
        ${direction === 'vertical' ? 'mp-vertical': ''}
      `}
    >
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