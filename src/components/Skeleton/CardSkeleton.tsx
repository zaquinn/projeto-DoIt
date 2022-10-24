import { Box, Skeleton, SkeletonProps } from "@chakra-ui/react";

interface CardSkeletonProps extends SkeletonProps {
  repeatCount: number;
}

export const CardSkeleton = ({
  repeatCount = 1,
  ...rest
}: CardSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  console.log(howMany);

  return (
    <>
      {howMany.map((_, index) => {
        return (
          <Skeleton
            key={index}
            {...rest}
            speed={1}
            startColor="gray.100"
            endColor="gray.200"
          >
            <Box w={["80vw", "auto"]} h="150px" p={["3", "7"]} />
          </Skeleton>
        );
      })}
    </>
  );
};
