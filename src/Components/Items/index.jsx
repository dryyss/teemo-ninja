import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TimelineLite } from 'gsap';
import _debounce from 'lodash/debounce';

import { getWeapons, getBagSize } from '../../Store/selectors/Items';
import { mergeWeapons } from '../../Store/actions/Items';

import './styles.scss';

const tl = new TimelineLite();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const Weapon = forwardRef(({ id, onDrag, onDragEnd }, ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (ref.current && id.indexOf('level-1') !== -1) {
      tl.fromTo(
        [ref.current],
        {
          transform: `matrix3d(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            500,180,0,1
          )`,
        },
        {
          transform: `matrix3d(
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            ${getRandomArbitrary(20, 450)},${getRandomArbitrary(0, 120)},0,1
          )`,
          duration: 0.5,
        },
      );
    }

    if (id.indexOf(':') !== -1) {
      const [x, y] = id.split('|')[1].split(':');

      tl.fromTo(
        [ref.current],
        {
          transform: `translate(${x}px, ${y}px)`,
          backgroundImage: `url(./images/effects/smoke.gif?t=${new Date().valueOf()})`,
        },
        {
          duration: 0.75,
        },
      ).to([ref.current], {
        backgroundImage: `url(./images/weapons/${id.slice(0, 7)}.png)`,
        duration: 0.1,
      });
    }
  }, [id, ref]);

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', `${event.target.id}`);

    // hack to remove ghost img when drag element
    const dragImg = new Image(0, 0);
    dragImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    event.dataTransfer.setDragImage(dragImg, 0, 0);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const dt = event.dataTransfer.getData('text');

    if (
      event.target.id !== dt &&
      event.target.id.slice(0, 7) === dt.slice(0, 7)
    ) {
      const { e: x, f: y } = new WebKitCSSMatrix(event.target.style.transform); // eslint-disable-line
      dispatch(
        mergeWeapons({
          item1: dt,
          item2: event.target.id,
          pos: {
            x: parseInt(Math.abs(x), 10),
            y: parseInt(Math.abs(y), 10),
          },
        }),
      );
    }
    event.dataTransfer.clearData();
  };

  return (
    <div
      id={id}
      key={id}
      ref={ref}
      draggable="true"
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      className="weapon-image"
      style={{
        backgroundImage: `url(./images/weapons/${id.slice(0, 7)}.png)`,
      }}
    />
  );
});

const Items = () => {
  const refWeapon = useRef(null);
  const refDropzone = useRef(null);
  const weapons = useSelector(getWeapons);
  const bagSize = useSelector(getBagSize);

  const onDragEnd = () => {
    refDropzone.current.style.backgroundColor = 'transparent';
  };

  const onDrag = useCallback(
    (e) => {
      // .getBoundingClientRect().left
      // .getBoundingClientRect().top
      const x = e.nativeEvent.layerX - refWeapon.current.offsetWidth / 2;
      const y = e.nativeEvent.layerY - refWeapon.current.offsetHeight / 2;
      if (
        x > 0 &&
        y > 0 &&
        x < refDropzone.current.offsetWidth - 56 &&
        y < refDropzone.current.offsetHeight - 56
      ) {
        e.target.style.transform = `translate(${x}px, ${y}px)`;
        refDropzone.current.style.backgroundColor = '#33ff000a';
      }
    },
    [refWeapon],
  );

  const weaponMemo = useMemo(
    () =>
      weapons.map((weapon) => (
        <Weapon
          key={weapon}
          id={weapon}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          ref={refWeapon}
        />
      )),
    [weapons, onDrag],
  );

  return (
    <div className="items">
      Bag {weapons.length} / {bagSize}
      <div className="dropzone" ref={refDropzone}>
        {weaponMemo}
      </div>
    </div>
  );
};

export default Items;
