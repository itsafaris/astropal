import React from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import { ChartItemFillSVG, ChartGridInnerSVG, ChartGridOuterSVG, ChartItemStrokeSVG } from "./svg";

export const COLORS = ["#FEA301", "#FFBC01", "#FFF500", "#ADFF00", "#2BFF00"];

interface Item {
  id: string;
  title: string;
  value: number;
}

interface EnhancedItem extends Item {
  color: string;
}

export function HarmonyChart({ items, size, ...rest }: { items: Item[]; size: number } & BoxProps) {
  const gridSize = size;
  const itemBottomOffset = -10;
  const maxItemSize = (size - itemBottomOffset) / 2;

  const [score, setScore] = React.useState<number | null>(null);
  const [scoreColor, setScoreColor] = React.useState<string | null>(null);
  const [enhancedItems, setEnhancedItems] = React.useState<EnhancedItem[]>([]);

  React.useEffect(() => {
    setScore(calcScore(items));
    setScoreColor(calcScoreColor(items));
    setEnhancedItems(
      items.map((it) => ({
        ...it,
        color: calcColor(it.value),
      }))
    );
  }, [items]);

  return (
    <Box position={"relative"} height={0} width={0} {...rest}>
      {scoreColor && (
        <>
          <Box
            height={1}
            width={1}
            borderRadius={"50%"}
            position={"absolute"}
            zIndex={0}
            boxShadow={`0px 0px 150px 100px ${scoreColor}`}
            opacity={0.7}
          />

          <Box
            height={1}
            width={1}
            borderRadius={"50%"}
            position={"absolute"}
            zIndex={0}
            boxShadow={`0px 0px 75px 50px #00a8ff`}
            opacity={0.7}
          />
        </>
      )}

      <ItemRenderer
        opacity={1}
        items={enhancedItems.map((it) => ({ ...it, value: 5 }))}
        strokeEnabled={true}
        fillEnabled={false}
        maxItemSize={maxItemSize}
        bottomOffset={itemBottomOffset}
        zIndex={0}
        showTitle={true}
        showStroke={false}
      />

      <ItemRenderer
        opacity={0.05}
        items={enhancedItems.map((it) => ({ ...it, value: 5 }))}
        strokeEnabled={true}
        fillEnabled={false}
        maxItemSize={maxItemSize}
        bottomOffset={itemBottomOffset}
        zIndex={0}
        showTitle={false}
        showStroke={true}
      />

      <ChartGridInner
        opacity={0.3}
        position={"absolute"}
        transform={`translate(-50%, -50%)`}
        size={gridSize}
        zIndex={0}
      />

      {Array.from(Array(5).keys()).map((_, idx) => {
        return (
          <React.Fragment key={idx}>
            <ChartGridOuter
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={300}
              zIndex={0}
            />
            <ChartGridOuter
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={250}
              zIndex={0}
            />
            <ChartGridOuter
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={200}
              zIndex={0}
            />
            <ChartGridOuter
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={150}
              zIndex={0}
            />
            <ChartGridOuter
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={100}
              zIndex={0}
            />
          </React.Fragment>
        );
      })}

      <ItemRenderer
        items={enhancedItems}
        strokeEnabled={true}
        fillEnabled={true}
        maxItemSize={maxItemSize}
        bottomOffset={itemBottomOffset}
        zIndex={1}
        showTitle={false}
      />

      <Box
        height={1}
        width={1}
        borderRadius={"50%"}
        backgroundColor={"white"}
        position={"absolute"}
        transform={"translate(-50%, -50%)"}
        zIndex={2}
        boxShadow={"0px 0px 20px 20px white"}
      />

      {score && (
        <Text
          position={"absolute"}
          color={"black"}
          fontSize={"60px"}
          fontWeight={"thin"}
          zIndex={20}
          top={0}
          left={0}
          transform={"translate(-50%, -50%)"}
        >
          {score}
        </Text>
      )}
    </Box>
  );
}

function ItemRenderer({
  items,
  maxItemSize,
  strokeEnabled = true,
  fillEnabled = true,
  showTitle,
  showStroke = true,
  bottomOffset,
  ...rest
}: {
  items: EnhancedItem[];
  maxItemSize: number;
  bottomOffset?: number;
  strokeEnabled?: boolean;
  fillEnabled?: boolean;
  showTitle: boolean;
  showStroke?: boolean;
  titleColor?: string;
} & BoxProps) {
  return items.map((it, idx, all) => {
    const size = calcItemSize(it, items, maxItemSize);
    const rotation = calcItemRotation(all.length, idx);
    const commonProps: ChartItemProps = {
      size: size,
      item: it,
      position: "absolute",
      bottom: bottomOffset ? `${bottomOffset}px` : undefined,
      transform: `translateX(-50%) rotate(${rotation}deg)`,
      transformOrigin: `50% calc(100% - 10px)`,
      rotation,
    };

    return (
      <Box key={it.id} position={"relative"} height={0} width={0} {...rest}>
        {fillEnabled && (
          <ChartItemFill
            opacity={0.4}
            key={`${it.id}-fill`}
            zIndex={Math.round((1 / it.value) * 10)}
            fillColor={"white"}
            {...commonProps}
          />
        )}
        {strokeEnabled && (
          <ChartItemStroke
            showStroke={showStroke}
            showTitle={showTitle}
            titleColor={it.color}
            key={`${it.id}-stroke`}
            zIndex={Math.round((1 / it.value) * 10)}
            {...commonProps}
          />
        )}
      </Box>
    );
  });
}

function ChartGridInner({ size, ...rest }: BoxProps & { size: number }) {
  const sizeString = `${size}px`;

  return (
    <Box height={sizeString} width={sizeString} {...rest}>
      <ChartGridInnerSVG height={sizeString} width={sizeString} />
    </Box>
  );
}

function ChartGridOuter({ size, ...rest }: BoxProps & { size: number }) {
  const sizeString = `${size}px`;

  return (
    <Box height={sizeString} width={sizeString} {...rest}>
      <ChartGridOuterSVG height={sizeString} width={sizeString} />
    </Box>
  );
}

type ChartItemProps = { item: Item; size: number; rotation: number } & BoxProps;

function ChartItemStroke({
  item,
  size,
  rotation,
  showTitle,
  showStroke = true,
  titleColor,
  ...rest
}: ChartItemProps & { showTitle: boolean; showStroke?: boolean; titleColor?: string }) {
  const sizeString = `${size}px`;

  return (
    <Box position="relative" height={sizeString} width={sizeString} {...rest}>
      {showStroke && <ChartItemStrokeSVG height={sizeString} width={sizeString} />}

      {showStroke && (
        <Box
          position={"absolute"}
          top={0}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          height={"10px"}
          width={"10px"}
          borderRadius={"50%"}
          backgroundColor={"white"}
        />
      )}

      {showTitle && (
        <Text
          fontSize={"small"}
          fontWeight={"bold"}
          textAlign={"center"}
          position={"absolute"}
          lineHeight={"normal"}
          color={titleColor || "white"}
          top={-10}
          left={"50%"}
          transform={`translate(-50%, -50%) rotate(${-rotation}deg)`}
        >
          {item.title}
        </Text>
      )}
    </Box>
  );
}

function ChartItemFill({ item, size, fillColor, ...rest }: ChartItemProps & { fillColor: string }) {
  const sizeString = `${size}px`;

  return (
    <Box position="relative" height={sizeString} width={sizeString} {...rest}>
      <ChartItemFillSVG id={item.id} height={sizeString} width={sizeString} color={fillColor} />
    </Box>
  );
}

function calcItemRotation(totalItemCount: number, itemIdx: number): number {
  return (360 / totalItemCount) * itemIdx;
}

function calcItemSize(item: Item, allItems: Item[], maxSize: number): number {
  const fixedPartRatio = 0.2;
  const fixedPart = maxSize * fixedPartRatio;

  const dynamicPartRatio = (1 / 5) * item.value;
  const dynamicPart = (maxSize - fixedPart) * dynamicPartRatio;

  return Math.round(fixedPart + dynamicPart);
}

function calcScoreColor(items: Item[]): string {
  const currentAverageValue = calcAverage(items);

  return calcColor(Math.round(currentAverageValue));
}

function calcColor(value: number): string {
  return COLORS[value - 1];
}

function calcScore(items: Item[]): number {
  const MAX_SCORE = 91;
  const MIN_SCORE = 10;
  const delta = MAX_SCORE - MIN_SCORE;
  const currentAverageValue = calcAverage(items);

  return Math.round(MIN_SCORE + delta * ((1 / 5) * currentAverageValue));
}

function calcAverage(items: Item[]): number {
  return items.reduce((val, it) => val + it.value, 0) / items.length;
}
