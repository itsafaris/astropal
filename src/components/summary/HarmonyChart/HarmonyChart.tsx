import React from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import { ChartItemFillSVG, ChartGridInnerSVG, ChartGridOuterSVG, ChartItemStrokeSVG } from "./svg";

interface Item {
  id: string;
  title: string;
  value: number;
}

export function HarmonyChart({ items, size, ...rest }: { items: Item[]; size: number } & BoxProps) {
  const highestValueItem = findHighestValue(items);
  const gridSize = size;
  const itemBottomOffset = -10;
  const maxItemSize = (size - itemBottomOffset) / 2;

  return (
    <Box position={"relative"} height={0} width={0} {...rest}>
      <ItemRenderer
        opacity={1}
        items={items.map((it) => ({ ...it, value: highestValueItem.value }))}
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
        items={items.map((it) => ({ ...it, value: highestValueItem.value }))}
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

      {Array.from(Array(highestValueItem.value).keys()).map((_, idx) => {
        return (
          <>
            <ChartGridOuter
              key={idx}
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={300}
              zIndex={0}
            />
            <ChartGridOuter
              key={idx}
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={250}
              zIndex={0}
            />
            <ChartGridOuter
              key={idx}
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={200}
              zIndex={0}
            />
            <ChartGridOuter
              key={idx}
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={150}
              zIndex={0}
            />
            <ChartGridOuter
              key={idx}
              opacity={0.05}
              position={"absolute"}
              transform={`translate(-50%, -50%)`}
              size={100}
              zIndex={0}
            />
          </>
        );
      })}

      <ItemRenderer
        items={items}
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

      <Text
        position={"absolute"}
        color="black"
        fontSize={"50px"}
        fontWeight={"bold"}
        zIndex={20}
        top={0}
        left={0}
        transform={"translate(-50%, -50%)"}
      >
        89
      </Text>
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
  items: Item[];
  maxItemSize: number;
  bottomOffset?: number;
  strokeEnabled?: boolean;
  fillEnabled?: boolean;
  showTitle: boolean;
  showStroke?: boolean;
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
    const fillColor = calcItemColor(it);

    return (
      <Box position={"relative"} height={0} width={0} {...rest}>
        {fillEnabled && (
          <ChartItemFill
            opacity={0.4}
            key={`${it.id}-fill`}
            zIndex={Math.round((1 / it.value) * 10)}
            fillColor={fillColor}
            {...commonProps}
          />
        )}
        {strokeEnabled && (
          <ChartItemStroke
            showStroke={showStroke}
            showTitle={showTitle}
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
  ...rest
}: ChartItemProps & { showTitle: boolean; showStroke?: boolean }) {
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
  const MAX_VALUE = findHighestValue(allItems).value;

  const fixedPartRatio = 0.2;
  const fixedPart = maxSize * fixedPartRatio;

  const dynamicPartRatio = (1 / MAX_VALUE) * item.value;
  const dynamicPart = (maxSize - fixedPart) * dynamicPartRatio;

  return Math.round(fixedPart + dynamicPart);
}

function calcItemColor(item: Item): string {
  const colors = ["white", "white", "white", "white", "white"];
  // const colors = ["green", "green", "green", "green", "green"];
  // const colors = ["#CF6AFF", "#9968E8", "#3A78B1", "#33AF73", "#01FE1D"];

  return colors[item.value - 1];
}

function findHighestValue(items: Item[]): Item {
  return items.reduce((max, it) => (it.value > max.value ? it : max));
}
