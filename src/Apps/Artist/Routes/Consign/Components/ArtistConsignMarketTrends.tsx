import { Box, Button, color, Flex, Sans, Serif } from "@artsy/palette"
import { AnalyticsSchema, useTracking } from "Artsy"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

import { ArtistConsignMarketTrends_artist } from "__generated__/ArtistConsignMarketTrends_artist.graphql"

interface ArtistConsignMarketTrendsProps {
  artist: ArtistConsignMarketTrends_artist
}

export const ArtistConsignMarketTrends: React.FC<ArtistConsignMarketTrendsProps> = props => {
  const tracking = useTracking()

  const {
    artist: {
      href,
      targetSupply: {
        microfunnel: {
          metadata: { highestRealized, str, realized },
        },
      },
    },
  } = props

  return (
    <SectionContainer background="black100">
      <Subheader color="white100">Market trends</Subheader>

      <Box my={[2, 4]}>
        <Flex flexDirection={["column", "row"]}>
          <Statistic
            top="Highest realized price"
            middle="All time"
            bottom={highestRealized}
          />
          <Statistic
            top="Sell through rate"
            middle="Last 12 months"
            bottom={str}
          />
          <Statistic
            top="Realized price over estimate"
            middle="Last 12 months"
            bottom={realized}
          />
        </Flex>
      </Box>

      <Box>
        <RouterLink
          to={`${href}/auction-results`}
          onClick={() => {
            tracking.trackEvent({
              action_type: AnalyticsSchema.ActionType.Click,
              subject: AnalyticsSchema.Subject.ExploreAuctionResults,
            })
          }}
        >
          <Button variant="primaryWhite">Explore auction results</Button>
        </RouterLink>
      </Box>
    </SectionContainer>
  )
}

const Statistic: React.FC<{ top: string; middle: string; bottom: string }> = ({
  top,
  middle,
  bottom,
}) => {
  return (
    <Flex
      flexDirection="column"
      width={["100%", 335]}
      py={[2, 0]}
      style={{
        textAlign: "center",
      }}
    >
      <Box>
        <Sans size="6" weight="medium" color="white">
          {top}
        </Sans>
      </Box>
      <Box>
        <Sans size="4" color={color("black10")}>
          {middle}
        </Sans>
      </Box>
      <Box>
        <Serif size="12" color="white">
          {bottom}
        </Serif>
      </Box>
    </Flex>
  )
}

export const ArtistConsignMarketTrendsFragmentContainer = createFragmentContainer(
  ArtistConsignMarketTrends,
  {
    artist: graphql`
      fragment ArtistConsignMarketTrends_artist on Artist {
        href
        targetSupply {
          microfunnel {
            metadata {
              highestRealized
              str
              realized
            }
          }
        }
      }
    `,
  }
)
