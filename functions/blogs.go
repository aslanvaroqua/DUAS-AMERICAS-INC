package main

import (
	"encoding/json"
	"sort"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/sbstjn/go-lambda-example/repository"
)

type DescendingDateBlogList []repository.Blog

func (a DescendingDateBlogList) Len() int           { return len(a) }
func (a DescendingDateBlogList) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a DescendingDateBlogList) Less(i, j int) bool { return a[i].Name < a[j].Name }

// PeopleResponse
type BlogResponse struct {
	People []repository.Blog `json:"data"`
}

func handleRequest(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	list := repository.GetBlogs()
	sort.Sort(DescendingDateBlogList(list))
	body, err := json.Marshal(BlogResponse{list})

	if err != nil {
		return events.APIGatewayProxyResponse{Body: "Unable to marshal JSON", StatusCode: 500}, nil
	}

	return events.APIGatewayProxyResponse{Body: string(body), StatusCode: 200}, nil
}

func main() {
	lambda.Start(handleRequest)
}
