package main

import (
	"encoding/json"
	"sort"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/sbstjn/go-lambda-example/repository"
)

type DescendingDateCorporationList []repository.Corporation

func (a DescendingDateCorporationList) Len() int           { return len(a) }
func (a DescendingDateCorporationList) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a DescendingDateCorporationList) Less(i, j int) bool { return a[i].Name < a[j].Name }

// PeopleResponse
type CorporationResponse struct {
	People []repository.Corporation `json:"data"`
}

func handleRequest(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	list := repository.GetCorporations()
	sort.Sort(DescendingDateCorporationList(list))
	body, err := json.Marshal(CorporationResponse{list})

	if err != nil {
		return events.APIGatewayProxyResponse{Body: "Unable to marshal JSON", StatusCode: 500}, nil
	}

	return events.APIGatewayProxyResponse{Body: string(body), StatusCode: 200}, nil
}

func main() {
	lambda.Start(handleRequest)
}
