@extends('layouts.master')

@section('content')

    <h1>Results <a href="{{ route('result.create') }}" class="btn btn-primary pull-right btn-sm">Add New Result</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Attempt Id</th><th>Question Id</th><th>Answer Id</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($results as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('/result', $item->id) }}">{{ $item->attempt_id }}</a></td><td>{{ $item->question_id }}</td><td>{{ $item->answer_id }}</td>
                    <td>
                        <a href="{{ route('result.edit', $item->id) }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'route' => ['result.destroy', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $results->render() !!} </div>
    </div>

@endsection
