import { HomeCard } from "./HomeCard";

export const HomeCardList = ({ cards, dummyCards }) => {
  const propertyMappings = {
    galleries: {
      imgProperty: 'gallery_img',
      titleProperty: 'gallery_name',
      descProperty: 'gallery_describe',
    },
    exhibitions: {
      imgProperty: 'gallery_img',
      titleProperty: 'gallery_title',
      descProperty: 'gallery_describe',
    },
    authors: {
      imgProperty: 'gallery_img',
      titleProperty: 'gallery_title',
      descProperty: 'gallery_describe',
    },
    works: {
      imgProperty: 'gallery_img',
      titleProperty: 'gallery_title',
      descProperty: 'gallery_describe',
    },
  }
  return (
    <div className="flex justify-between">
      {dummyCards.map((card, index) => (
        <HomeCard
          key={index}
          src={card.src}
          title={card.title}
          desc={card.desc}
        />
      ))}
    </div>
  );
};
